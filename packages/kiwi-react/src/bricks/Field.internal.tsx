/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as Ariakit from "@ariakit/react";

type CollectionStoreItem = NonNullable<
	ReturnType<ReturnType<typeof Ariakit.useCollectionStore>["item"]>
>;

interface FieldCollectionStoreItem extends CollectionStoreItem {
	/** The type of field element being tracked */
	elementType: "label" | "control" | "description";

	/** If a control, the type of control. */
	controlType?: "textlike" | "checkable";
}

export const FieldInvalidContext = React.createContext<boolean | undefined>(
	undefined,
);

/**
 * A collection that tracks labels, controls, and descriptions which provides
 * information about IDs, placement of labels, and control types.
 * @internal
 */
export function FieldCollection(
	props: Pick<Ariakit.CollectionProps, "render">,
) {
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
 * @internal
 */
export function FieldControl(props: FieldCollectionItemControlProps) {
	const invalid = React.useContext(FieldInvalidContext);
	const store = Ariakit.useCollectionContext();
	const generatedId = React.useId();
	const { id = store ? generatedId : undefined, type, ...rest } = props;
	const renderedItems = Ariakit.useStoreState(store, "renderedItems");
	const describedBy = React.useMemo(() => {
		// Create a space separated list of description IDs
		const idRefList = renderedItems
			?.filter(
				(item: FieldCollectionStoreItem) => item.elementType === "description",
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
			controlType: type,
		}),
		[type],
	);
	return (
		<Ariakit.CollectionItem
			id={id}
			getItem={getData}
			render={
				<Ariakit.Role
					{...rest}
					aria-invalid={invalid}
					aria-describedby={describedBy}
				/>
			}
		/>
	);
}

/**
 * An element tracked as a label in the `Field`’s collection.
 * @internal
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

/**
 * An element tracked as a description in the `Field`’s collection.
 * @internal
 */
export function FieldDescription(
	props: Pick<Ariakit.CollectionItemProps, "render" | "id">,
) {
	const generatedId = React.useId();
	const { id = generatedId, ...rest } = props;
	const getData = React.useCallback(
		(data: CollectionStoreItem) => ({
			...data,
			elementType: "description",
		}),
		[],
	);
	return <Ariakit.CollectionItem {...rest} id={id} getItem={getData} />;
}
