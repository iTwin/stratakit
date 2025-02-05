/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

export const isBrowser = typeof document !== "undefined";

export const supportsPopover = isBrowser && "popover" in HTMLElement.prototype;

// ----------------------------------------------------------------------------

/**
 * Wrapper over `React.forwardRef` which allows refs to be loosely typed as `HTMLElement`.
 *
 * Usage:
 *
 * ```tsx
 * const Button = forwardRef<"button", ButtonProps>((props, forwardedRef) => {});
 *
 * const ref = React.useRef<HTMLElement>(null); // or React.useRef<HTMLButtonElement>(null)
 * <Button ref={ref} />
 * ```
 *
 * **Note**: The first type parameter is the default element type, which is slightly different
 * from what `React.forwardRef` expects. e.g. This utility expects `"div"` instead of `ComponentRef<"div">`.
 *
 * @private
 */
export const forwardRef = React.forwardRef as ForwardRefHelper;

type ForwardRefHelper = <
	DefaultElement extends React.ElementType,
	Props extends {},
>(
	render: React.ForwardRefRenderFunction<
		React.ComponentRef<DefaultElement>,
		React.PropsWithoutRef<Props>
	>,
) => React.ForwardRefExoticComponent<
	React.PropsWithoutRef<Props> &
		React.RefAttributes<React.ComponentRef<DefaultElement> | HTMLElement>
>;

// ----------------------------------------------------------------------------

/** Element type props merged with custom props. */
type MergeProps<
	ElementType extends React.ElementType,
	CustomProps extends Record<string, unknown>,
> = CustomProps &
	Omit<React.ComponentPropsWithoutRef<ElementType>, keyof CustomProps>;

/** Base component props with custom props. */
export type BaseProps<ElementType extends React.ElementType = "div"> =
	MergeProps<ElementType, Pick<Ariakit.RoleProps, "render">>;

/** Focusable component props with custom props. */
export type FocusableProps<ElementType extends React.ElementType = "div"> =
	BaseProps<ElementType> &
		Pick<
			Ariakit.FocusableProps,
			"disabled" | "accessibleWhenDisabled" | "autoFocus"
		>;

// ----------------------------------------------------------------------------

type CollectionStoreItem = NonNullable<
	ReturnType<ReturnType<typeof Ariakit.useCollectionStore>["item"]>
>;

interface FieldElementCollectionStoreItem extends CollectionStoreItem {
	/** The type of field element being tracked */
	elementType: "label" | "control" | "description";

	/** If a control, the type of control. */
	controlType?: "textlike" | "checkable";
}

export function FieldCollection(
	props: Pick<Ariakit.CollectionProps, "render">,
) {
	const fieldElementCollection =
		Ariakit.useCollectionStore<FieldElementCollectionStoreItem>({
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
	type: FieldElementCollectionStoreItem["controlType"];
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
	const store =
		Ariakit.useCollectionContext() as Ariakit.CollectionStore<FieldElementCollectionStoreItem>;
	const renderedItems = Ariakit.useStoreState(store, "renderedItems");
	const fieldId = React.useMemo(
		() => renderedItems?.find((item) => item.elementType === "control")?.id,
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
