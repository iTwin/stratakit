/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { Role } from "@ariakit/react/role";
import {
	useCollectionContext,
	CollectionItem,
	type CollectionItemProps,
} from "@ariakit/react/collection";
import { useStoreState } from "@ariakit/react/store";
import { forwardRef, type BaseProps } from "./~utils.js";
import {
	FieldCollection,
	FieldControlTypeContext,
	type CollectionStoreItem,
	type FieldCollectionStoreItem,
} from "./Field.internal.js";
import { Label } from "./Label.js";
import { Description } from "./Description.js";

// ----------------------------------------------------------------------------

interface FieldRootProps extends BaseProps {
	/**
	 * Allows overriding the default block layout for text controls.
	 */
	layout?: "inline";
}

/**
 * A container for form controls. It manages ID associations, and provides a
 * consistent layout and spacing.
 *
 * Example:
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Label</Field.Label>
 *   <Field.Control render={<TextBox.Input />} />
 * </Field.Root>
 * ```
 *
 * Supports a `layout` prop, which can be set to `inline` to align the label and
 * control horizontally.
 *
 * Should contain a `Field.Label` component paired with a form control.
 *
 * Supported form controls include:
 * - `TextBox.Input`
 * - `TextBox.Textarea`
 * - `Checkbox`
 * - `Radio`
 * - `Switch`
 */
const FieldRoot = forwardRef<"div", FieldRootProps>((props, forwardedRef) => {
	const { layout, ...rest } = props;
	return (
		<FieldCollection
			render={
				<Role.div
					{...rest}
					className={cx("🥝-field", props.className)}
					data-kiwi-layout={layout}
					ref={forwardedRef}
				/>
			}
		/>
	);
});
DEV: FieldRoot.displayName = "Field";

// ----------------------------------------------------------------------------

/**
 * A label for the field’s control element. This is automatically associated
 * with the control’s `id`.
 */
const FieldLabel = forwardRef<"div", BaseProps<"label">>(
	(props, forwardedRef) => {
		const store = useCollectionContext();
		const renderedItems = useStoreState(
			store,
			"renderedItems",
		) as FieldCollectionStoreItem[];
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
			<CollectionItem
				getItem={getData}
				render={<Label {...props} htmlFor={fieldId} />}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: FieldLabel.displayName = "Field.Label";

// ----------------------------------------------------------------------------

/**
 * A description for the field’s control element. This is automatically
 * associated with the control.
 *
 * Should not include content without an adequate text alternative (e.g.
 * interactive elements).
 */
const FieldDescription = forwardRef<"div", BaseProps>((props, forwardedRef) => {
	const generatedId = React.useId();
	const { id = generatedId, ...rest } = props;
	const getData = React.useCallback(
		(data: CollectionStoreItem) => ({
			...data,
			elementType: "description",
		}),
		[],
	);
	return (
		<CollectionItem
			getItem={getData}
			id={id}
			render={<Description {...rest} />}
			ref={forwardedRef}
		/>
	);
});
DEV: FieldDescription.displayName = "Field.Description";

// ----------------------------------------------------------------------------

interface FieldCollectionItemControlProps
	extends Pick<CollectionItemProps, "render" | "id"> {}

/**
 * The control component for the field.
 *
 * If the rendered component uses a compositional API, then use a function
 * within `render` to apply the `controlProps` to the correct sub-component:
 *
 * ```tsx
 * <Field.Control
 *   render={(controlProps) => (
 *     <TextBox.Root>
 *       <TextBox.Icon href={placeholder} />
 *       <TextBox.Input {...controlProps} />
 *     </TextBox.Root>
 *   )}
 * />
 * ```
 *
 * If you need a custom `id` set for the control, set it on this component
 * instead of the control component within `render`.
 *
 * ```tsx
 * <Field.Control id="custom" render={<TextBox.Input />} />
 * ```
 */
const FieldControl = forwardRef<"div", FieldCollectionItemControlProps>(
	(props, forwardedRef) => {
		const [controlType, setControlType] =
			React.useState<FieldCollectionStoreItem["controlType"]>();
		const store = useCollectionContext();
		const generatedId = React.useId();
		const { id = store ? generatedId : undefined, ...rest } = props;
		const renderedItems = useStoreState(
			store,
			"renderedItems",
		) as FieldCollectionStoreItem[];

		const describedBy = React.useMemo(() => {
			// Create a space separated list of description IDs
			const idRefList = renderedItems
				?.filter(
					(item) =>
						item.elementType === "description" || item.elementType === "error",
				)
				?.map((item) => item.id)
				.join(" ");
			// An empty string is valid for `aria-describedby`, but we don’t want that
			// (e.g. `aria-describedby=""`). We use the empty string’s falsiness to
			// return undefined to avoid setting the attribute at all.
			return idRefList || undefined;
		}, [renderedItems]);

		const getData = React.useCallback(
			(data: CollectionStoreItem) => ({
				...data,
				elementType: "control",
				controlType,
			}),
			[controlType],
		);

		const invalid = React.useMemo(
			() =>
				renderedItems?.some(
					(item: FieldCollectionStoreItem) => item.elementType === "error",
				),
			[renderedItems],
		);

		return (
			<FieldControlTypeContext.Provider value={setControlType}>
				<CollectionItem
					id={id}
					getItem={getData}
					render={
						<Role
							{...rest}
							aria-invalid={invalid ? "true" : undefined}
							aria-describedby={describedBy}
						/>
					}
					ref={forwardedRef}
				/>
			</FieldControlTypeContext.Provider>
		);
	},
);
DEV: FieldControl.displayName = "Field.Control";

// ----------------------------------------------------------------------------

/**
 * An associated error message for a field. When used within `<Field.Root>`, the
 * associated form control will be rendered with `aria-invalid="true"`.
 *
 * Example:
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Label</Field.Label>
 *   <Field.Control render={<TextBox.Input />} />
 *   <Field.ErrorMessage>Something is wrong!</Field.ErrorMessage>
 * </Field.Root>
 * ```
 */
const FieldErrorMessage = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => {
		const generatedId = React.useId();
		const { id = generatedId, ...rest } = props;

		const getData = React.useCallback(
			(data: CollectionStoreItem) => ({
				...data,
				elementType: "error",
			}),
			[],
		);

		return (
			<CollectionItem
				id={id}
				getItem={getData}
				render={<Description {...rest} tone="critical" />}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: FieldErrorMessage.displayName = "Field.ErrorMessage";

// ----------------------------------------------------------------------------

export {
	FieldRoot as Root,
	FieldControl as Control,
	FieldLabel as Label,
	FieldDescription as Description,
	FieldErrorMessage as ErrorMessage,
};
