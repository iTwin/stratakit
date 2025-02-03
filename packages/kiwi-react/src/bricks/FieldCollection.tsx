/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import * as React from "react";

/* TODO: maybe find a way to get this in from `@ariakit/core` */
export interface FieldElementCollectionStoreItem {
	/** The ID of the element being tracked */
	id: string;

	/** The element being tracked */
	element?: HTMLElement | null;

	/** The type of field element being tracked */
	elementType: "label" | "control" | "description";

	/** If a control, the type of control. */
	controlType?: "textlike" | "checkable";
}

// ----------------------------------------------------------------------------

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
		let controlIndex: number | undefined;
		return [
			renderedItems.find((item, index) => {
				if (item.elementType !== "control") return;
				controlIndex = index;
				return true;
			})?.controlType,
			controlIndex,
		];
	}, [renderedItems]);

	// Compare the control and label position
	const labelPlacement = React.useMemo(() => {
		if (controlIndex == null) return;
		const labelIndex = renderedItems.findIndex(
			(item) => item.elementType === "label",
		);
		return labelIndex === -1
			? undefined
			: labelIndex < controlIndex
				? "before"
				: "after";
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

// ----------------------------------------------------------------------------

interface FieldCollectionItemControlProps
	extends Pick<Ariakit.CollectionItemProps, "render"> {
	type: FieldElementCollectionStoreItem["controlType"];
}

/**
 * An element tracked as a control in the `Field`’s collection.
 */
export function FieldCollectionItemControl(
	props: FieldCollectionItemControlProps,
) {
	const { type, ...rest } = props;
	const getData = React.useCallback(
		(data: FieldElementCollectionStoreItem) => ({
			...data,
			elementType: "control",
			controlType: type,
		}),
		[type],
	);
	return <Ariakit.CollectionItem {...rest} getItem={getData} />;
}

// ----------------------------------------------------------------------------

/**
 * An element tracked as a label in the `Field`’s collection.
 */
export function FieldCollectionItemLabel(
	props: Pick<Ariakit.CollectionItemProps, "render">,
) {
	const getData = React.useCallback(
		(data: FieldElementCollectionStoreItem) => ({
			...data,
			elementType: "label",
		}),
		[],
	);
	return <Ariakit.CollectionItem {...props} getItem={getData} />;
}
