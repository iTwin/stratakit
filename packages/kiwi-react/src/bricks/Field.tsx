/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface FieldProps extends BaseProps {
	/**
	 * Allows overriding the default block layout for text controls.
	 */
	layout?: "inline";
}

/**
 * A container for form controls. It manages ID associations provides a consistent layout and spacing.
 *
 * Example:
 * ```tsx
 * <Field>
 *   <Label>Label</Label>
 *   <TextBox.Input />
 * </Field>
 * ```
 *
 * Supports a `layout` prop, which can be set to `inline` to align the label and control horizontally.
 *
 * Should contain a `Label` component paired with a form control. Supported form controls include:
 * - `TextBox.Input`
 * - `TextBox.Textarea`
 * - `Checkbox`
 * - `Radio`
 * - `Switch`
 */
export const Field = forwardRef<"div", FieldProps>((props, forwardedRef) => {
	const { layout, ...rest } = props;
	return (
		<FieldDescribedByProvider>
			<FieldCollection
				render={
					<Ariakit.Role.div
						{...rest}
						className={cx("🥝-field", props.className)}
						data-kiwi-layout={layout}
						ref={forwardedRef}
					/>
				}
			/>
		</FieldDescribedByProvider>
	);
});
DEV: Field.displayName = "Field";

// ----------------------------------------------------------------------------

interface FieldDescribedBy {
	describedBy: Set<string>;
	register: (id: string) => void;
	unregister: (id: string) => void;
}

const FieldDescribedByContext = React.createContext<
	FieldDescribedBy | undefined
>(undefined);

function FieldDescribedByProvider(props: { children?: React.ReactNode }) {
	const [describedBy, setDescribedBy] = React.useState<
		FieldDescribedBy["describedBy"]
	>(new Set());

	const register = React.useCallback((id: string) => {
		setDescribedBy((describedBy) => {
			const updated = new Set(describedBy);
			updated.add(id);
			return updated;
		});
	}, []);

	const unregister = React.useCallback((id: string) => {
		setDescribedBy((describedBy) => {
			const updated = new Set(describedBy);
			updated.delete(id);
			return updated;
		});
	}, []);

	return (
		<FieldDescribedByContext.Provider
			value={React.useMemo(
				() => ({
					describedBy,
					register,
					unregister,
				}),
				[describedBy, register, unregister],
			)}
		>
			{props.children}
		</FieldDescribedByContext.Provider>
	);
}

/**
 * Use the description IDs for a field.
 */
export function useFieldDescribedBy(ariaDescribedByProp?: string) {
	const describedBySet = React.useContext(FieldDescribedByContext)?.describedBy;
	return React.useMemo(
		() =>
			!describedBySet || describedBySet.size === 0
				? ariaDescribedByProp
				: [...describedBySet, ariaDescribedByProp].filter(Boolean).join(" "),
		[describedBySet, ariaDescribedByProp],
	);
}

/**
 * Registers a description for an associated control.
 */
export function useFieldRegisterDescribedBy(id: string) {
	const context = React.useContext(FieldDescribedByContext);
	const register = context?.register;
	const unregister = context?.unregister;

	React.useEffect(() => {
		if (!register || !unregister) return;

		register(id);
		return () => unregister(id);
	}, [id, register, unregister]);
}

// ----------------------------------------------------------------------------

type CollectionStoreItem = NonNullable<
	ReturnType<ReturnType<typeof Ariakit.useCollectionStore>["item"]>
>;

interface FieldCollectionStoreItem extends CollectionStoreItem {
	/** The type of field element being tracked */
	elementType: "label" | "control" | "description";

	/** If a control, the type of control. */
	controlType?: "textlike" | "checkable";
}

function FieldCollection(props: Pick<Ariakit.CollectionProps, "render">) {
	const fieldElementCollection =
		Ariakit.useCollectionStore<FieldCollectionStoreItem>({
			defaultItems: [],
		});
	const renderedItems = Ariakit.useStoreState(
		fieldElementCollection,
		"renderedItems",
	);

	// Collect the control type and index
	const [controlType, controlIndex] = React.useMemo(() => {
		const controlIndex = renderedItems.findIndex(
			(item) => item.elementType === "control",
		);

		return [renderedItems[controlIndex]?.controlType, controlIndex];
	}, [renderedItems]);

	// Compare the control and label position
	const labelPlacement = React.useMemo(() => {
		const labelIndex = renderedItems.findIndex(
			(item) => item.elementType === "label",
		);
		if (controlIndex === -1 || labelIndex === -1) return;

		return labelIndex < controlIndex ? "before" : "after";
	}, [renderedItems, controlIndex]);

	return (
		<Ariakit.Collection
			{...props}
			store={fieldElementCollection}
			data-kiwi-label-placement={labelPlacement}
			data-kiwi-control-type={controlType}
		/>
	);
}

interface FieldCollectionItemControlProps
	extends Pick<Ariakit.CollectionItemProps, "render" | "id"> {
	type: FieldCollectionStoreItem["controlType"];
}

/**
 * An element tracked as a control in the `Field`’s collection.
 */
export function FieldControl(props: FieldCollectionItemControlProps) {
	const generatedId = React.useId();
	const { id = generatedId, type, ...rest } = props;
	const getData = React.useCallback(
		(data: CollectionStoreItem) => ({
			...data,
			elementType: "control",
			controlType: type,
		}),
		[type],
	);
	return <Ariakit.CollectionItem {...rest} id={id} getItem={getData} />;
}

/**
 * An element tracked as a label in the `Field`’s collection.
 */
export function FieldLabel(props: Pick<Ariakit.CollectionItemProps, "render">) {
	const store = Ariakit.useCollectionContext();
	const renderedItems = Ariakit.useStoreState(store, "renderedItems");
	const fieldId = React.useMemo(
		() =>
			renderedItems?.find(
				(item: FieldCollectionStoreItem) => item.elementType === "control",
			)?.id,
		[renderedItems],
	);

	const getData = React.useCallback(
		(data: CollectionStoreItem) => ({
			...data,
			elementType: "label",
		}),
		[],
	);

	return (
		<Ariakit.CollectionItem
			getItem={getData}
			render={<Ariakit.Role.label {...props} htmlFor={fieldId} />}
		/>
	);
}
