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
 * <Field.Root>
 *   <Field.Label>Label</Field.Label>
 *   <TextBox.Input />
 * </Field.Root>
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
const FieldRoot = forwardRef<"div", FieldProps>((props, forwardedRef) => {
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

export const FieldLabel = forwardRef<"div", BaseProps<"label">>(
	(props, forwardedRef) => {
		const store = useCollectionContext();
		const renderedItems = useStoreState(store, "renderedItems");
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

export const FieldDescription = forwardRef<"div", BaseProps>(
	(props, forwardedRef) => {
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
	},
);
DEV: FieldDescription.displayName = "Field.Description";

// ----------------------------------------------------------------------------

interface FieldCollectionItemControlProps
	extends Pick<CollectionItemProps, "render" | "id"> {}

export const FieldControl = forwardRef<"div", FieldCollectionItemControlProps>(
	(props, forwardedRef) => {
		const [controlType, setControlType] =
			React.useState<FieldCollectionStoreItem["controlType"]>();
		const store = useCollectionContext();
		const generatedId = React.useId();
		const { id = store ? generatedId : undefined, ...rest } = props;
		const renderedItems = useStoreState(store, "renderedItems");
		const describedBy = React.useMemo(() => {
			// Create a space separated list of description IDs
			const idRefList = renderedItems
				?.filter(
					(item: FieldCollectionStoreItem) =>
						item.elementType === "description",
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
		return (
			<FieldControlTypeContext.Provider value={setControlType}>
				<CollectionItem
					id={id}
					getItem={getData}
					render={<Role {...rest} aria-describedby={describedBy} />}
					ref={forwardedRef}
				/>
			</FieldControlTypeContext.Provider>
		);
	},
);
DEV: FieldControl.displayName = "Field.Control";

// ----------------------------------------------------------------------------

export {
	FieldRoot as Root,
	FieldControl as Control,
	FieldLabel as Label,
	FieldDescription as Description,
};
