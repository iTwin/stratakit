/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import {
	useCollectionStore,
	Collection,
	type CollectionProps,
} from "@ariakit/react/collection";
import { useStoreState } from "@ariakit/react/store";

// ----------------------------------------------------------------------------

/**
 * Ariakit’s unexported `CollectionStoreItem` type inferred.
 * @private
 */
export type CollectionStoreItem = NonNullable<
	ReturnType<ReturnType<typeof useCollectionStore>["item"]>
>;

/**
 * An extension of `CollectionStoreItem` to track element and control types.
 * @private
 */
export interface FieldCollectionStoreItem extends CollectionStoreItem {
	/** The type of field element being tracked */
	elementType: "label" | "control" | "description" | "error";

	/** If a control, the type of control. */
	controlType?: "textlike" | "checkable";
}

// ----------------------------------------------------------------------------

/**
 * A collection that tracks labels, controls, and descriptions which provides
 * information about IDs, placement of labels, and control types.
 * @private
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

// ----------------------------------------------------------------------------

/**
 * Control type context for the field.
 * @private
 */
export const FieldControlTypeContext = React.createContext<
	| React.Dispatch<
			React.SetStateAction<FieldCollectionStoreItem["controlType"]>
	  >
	| undefined
>(undefined);

/**
 * Sets the control type for the field. Necessary for layout.
 * @private
 */
export function useFieldControlType(
	controlType: NonNullable<FieldCollectionStoreItem["controlType"]>,
) {
	const setControlType = React.useContext(FieldControlTypeContext);
	React.useEffect(() => {
		setControlType?.(controlType);
	}, [controlType, setControlType]);
}
