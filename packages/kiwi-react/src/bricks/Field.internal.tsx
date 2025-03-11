/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	useCollectionStore,
	Collection,
	useCollectionContext,
	CollectionItem,
	type CollectionProps,
	type CollectionItemProps,
} from "@ariakit/react/collection";
import { useStoreState } from "@ariakit/react/store";

type CollectionStoreItem = NonNullable<
	ReturnType<ReturnType<typeof useCollectionStore>["item"]>
>;

interface FieldCollectionStoreItem extends CollectionStoreItem {
	/** The type of field element being tracked */
	elementType: "label" | "control" | "description";

	/** If a control, the type of control. */
	controlType?: "textlike" | "checkable";
}

/**
 * A collection that tracks labels, controls, and descriptions which provides
 * information about IDs, placement of labels, and control types.
 * @internal
 */
export function FieldCollection(props: Pick<CollectionProps, "render">) {
	const fieldElementCollection = useCollectionStore<FieldCollectionStoreItem>({
		defaultItems: [],
	});
	const renderedItems = useStoreState(fieldElementCollection, "renderedItems");

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
		<Collection
			{...props}
			store={fieldElementCollection}
			data-kiwi-label-placement={labelPlacement}
			data-kiwi-control-type={controlType}
		/>
	);
}

interface FieldCollectionItemControlProps
	extends Pick<CollectionItemProps, "render" | "id"> {
	type: FieldCollectionStoreItem["controlType"];
}

/**
 * An element tracked as a control in the `Field`’s collection.
 * @internal
 */
export function FieldControl(props: FieldCollectionItemControlProps) {
	const store = useCollectionContext();
	const generatedId = React.useId();
	const { id = store ? generatedId : undefined, type, ...rest } = props;
	const renderedItems = useStoreState(store, "renderedItems");
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
		<CollectionItem
			id={id}
			getItem={getData}
			render={<Role {...rest} aria-describedby={describedBy} />}
		/>
	);
}
