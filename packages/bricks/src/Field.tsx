/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	CollectionItem,
	useCollectionContext,
} from "@ariakit/react/collection";
import { Role } from "@ariakit/react/role";
import { useStoreState } from "@ariakit/react/store";
import { Icon } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import Description from "./Description.js";
import { FieldCollection, FieldControlTypeContext } from "./Field.internal.js";
import Label from "./Label.js";

import type { CollectionItemProps } from "@ariakit/react/collection";
import type { BaseProps } from "@stratakit/foundations/secret-internals";
import type {
	CollectionStoreItem,
	FieldCollectionStoreItem,
} from "./Field.internal.js";

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
					className={cx("🥝Field", props.className)}
					data-_sk-layout={layout}
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
const FieldLabel = forwardRef<"label", BaseProps<"label">>(
	(props, forwardedRef) => {
		const store = useCollectionContext();
		const renderedItems = useStoreState(store, "renderedItems") as
			| FieldCollectionStoreItem[]
			| undefined;
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
				ref={forwardedRef as CollectionItemProps["ref"]}
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
	extends Pick<CollectionItemProps, "render" | "id"> {
	render:
		| React.JSX.Element
		| ((
				props: Omit<
					// biome-ignore lint/suspicious/noExplicitAny: we don't know the element type here
					React.HTMLAttributes<any> & { ref?: React.Ref<any> },
					"children" // omit children to avoid errors with `<input>` elements
				>,
		  ) => React.ReactNode);
}

/**
 * The control component for the field.
 *
 * Use the `render` prop to render the control component.
 *
 * ```tsx
 * <Field.Control render={<TextBox.Input />} />
 * ```
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
		const renderedItems = useStoreState(store, "renderedItems") as
			| FieldCollectionStoreItem[]
			| undefined;

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

interface FieldErrorMessageProps extends BaseProps {
	/**
	 * Icon to display at the start of the error message.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 *
	 * @default Custom error icon
	 */
	startIcon?: string | React.JSX.Element;
}

/**
 * An associated error message for a field. When used within `<Field.Root>`, the
 * associated form control will be rendered with `aria-invalid="true"`.
 *
 * Automatically displays an error icon at the start of the message.
 *
 * Example:
 * ```tsx
 * <Field.Root>
 *   <Field.Label>Label</Field.Label>
 *   <Field.Control render={<TextBox.Input />} />
 *   <Field.ErrorMessage>Something is wrong!</Field.ErrorMessage>
 * </Field.Root>
 * ```
 *
 * You can customize the icon:
 * ```tsx
 * <Field.ErrorMessage startIcon={<Icon href={customIcon} />}>
 *   Custom error message
 * </Field.ErrorMessage>
 * ```
 */
const FieldErrorMessage = forwardRef<"div", FieldErrorMessageProps>(
	(props, forwardedRef) => {
		const generatedId = React.useId();
		const { id = generatedId, startIcon, children, ...rest } = props;

		const getData = React.useCallback(
			(data: CollectionStoreItem) => ({
				...data,
				elementType: "error",
			}),
			[],
		);

		const defaultErrorIcon = (
			<Icon
				render={
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 16 16"
					>
						<path
							fill="#df1b41"
							d="M10.086 2H5.914a1 1 0 0 0-.707.293L2.293 5.207A1 1 0 0 0 2 5.914v4.237a1 1 0 0 0 .3.714l2.908 2.85a1 1 0 0 0 .7.285h4.178a1 1 0 0 0 .707-.293l2.914-2.914a1 1 0 0 0 .293-.707V5.914a1 1 0 0 0-.293-.707l-2.914-2.914A1 1 0 0 0 10.086 2Z"
						/>
						<path
							fill="#fff"
							opacity=".16"
							d="M10.086 3 13 5.914v4.172L10.086 13H5.908L3 10.151V5.914L5.914 3h4.172m0-1H5.914a1 1 0 0 0-.707.293L2.293 5.207A1 1 0 0 0 2 5.914v4.237a1 1 0 0 0 .3.714l2.908 2.85a1 1 0 0 0 .7.285h4.178a1 1 0 0 0 .707-.293l2.914-2.914a1 1 0 0 0 .293-.707V5.914a1 1 0 0 0-.293-.707l-2.914-2.914A1 1 0 0 0 10.086 2Z"
						/>
						<path
							fill="#000"
							opacity=".48"
							d="M8 4c-.514 0-.982.24-1.282.657-.301.417-.38.936-.218 1.424l.788 2.365a.75.75 0 0 0 1.424 0L9.5 6.081a1.564 1.564 0 0 0-.218-1.424A1.565 1.565 0 0 0 8 4Zm0 5.25c-.758 0-1.375.617-1.375 1.375S7.242 12 8 12s1.375-.617 1.375-1.375S8.758 9.25 8 9.25Z"
						/>
						<path
							fill="#fff"
							d="M8 9.75a.875.875 0 1 1 0 1.75.875.875 0 0 1 0-1.75ZM8 4.5c.738 0 1.26.723 1.026 1.423l-.789 2.365a.25.25 0 0 1-.474 0l-.788-2.365A1.081 1.081 0 0 1 8 4.5Z"
						/>
					</svg>
				}
			/>
		);

		const iconElement =
			startIcon !== undefined ? (
				typeof startIcon === "string" ? (
					<Icon href={startIcon} />
				) : (
					startIcon
				)
			) : (
				defaultErrorIcon
			);

		return (
			<CollectionItem
				id={id}
				getItem={getData}
				render={
					<Description {...rest} tone="critical">
						{iconElement}
						{children}
					</Description>
				}
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
