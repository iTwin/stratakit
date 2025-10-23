/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import {
	Collection,
	CollectionItem,
	useCollectionStore,
} from "@ariakit/react/collection";
import {
	Dialog,
	DialogDisclosure,
	DialogProvider,
} from "@ariakit/react/dialog";
import { Role } from "@ariakit/react/role";
import { useStoreState } from "@ariakit/react/store";
import { Button, Text, VisuallyHidden } from "@stratakit/bricks";
import { IconButtonPresentation } from "@stratakit/bricks/secret-internals";
import {
	forwardRef,
	useControlledState,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { ChevronDown, StatusIcon } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface ErrorRegionRootBaseProps extends Omit<BaseProps, "children"> {
	/**
	 * Label for the error header, usually indicating the number of errors displayed.
	 *
	 * Changes to the `label` prop will be communicated
	 * using a [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions).
	 *
	 * (deprecated behavior) Use `undefined` if you don't want to display errors rather than conditionally rendering the component.
	 * Use `items` prop instead.
	 */
	label?: React.ReactNode;
	/**
	 * A list of error items where each item describes an individual error. Must be a list of `ErrorRegion.Item` components.
	 *
	 * Set to `undefined` or empty array if you don't want to display errors rather than conditionally rendering the component.
	 */
	items?: React.ReactNode;
	/**
	 * The controlled open state of the region.
	 */
	open?: boolean;
	/**
	 * Callback fired when the region is open.
	 *
	 * Should be used with the `open` prop.
	 */
	setOpen?: (open: boolean) => void;
}

type ErrorRegionRootExtraProps =
	| {
			/**
			 * Name of the region navigational landmark.
			 */
			"aria-label": string | undefined;
	  }
	| {
			/**
			 * Identifies the element that labels the region navigational landmark.
			 */
			"aria-labelledby": string | undefined;
	  };

type ErrorRegionRootProps = ErrorRegionRootBaseProps &
	ErrorRegionRootExtraProps;

/**
 * A collapsible region that displays a list of error messages, which might originate from another
 * component, such as `Tree`.
 *
 * This component is rendered as a [region landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/region.html)
 * and should be labelled using `aria-label` or `aria-labelledby`.
 *
 * This component should not be rendered conditionally, instead use the `items` prop to control the visibility.
 *
 * Example:
 * ```tsx
 * <ErrorRegion.Root
 *   aria-label="Issues"
 *   label="3 issues found"
 *   items={[
 *     <ErrorRegion.Item key={…} message="…" />
 *     <ErrorRegion.Item key={…} message="…" />
 *     <ErrorRegion.Item key={…} message="…" />
 *   ]}
 * />
 */
const ErrorRegionRoot = forwardRef<"div", ErrorRegionRootProps>(
	(props, forwardedRef) => {
		const {
			label,
			items: itemsProp = [],
			open: openProp,
			setOpen: setOpenProp,
			...rest
		} = props;
		const labelId = React.useId();
		const sectionLabelledBy = props["aria-label"]
			? undefined
			: label
				? labelId
				: undefined;

		DEV: if (!Array.isArray(itemsProp))
			console.warn(
				"`items` prop of `ErrorRegion.Root` expects an array of React nodes. `ReactNode` support is deprecated and will be removed in a future release.",
			);

		const visible = Array.isArray(itemsProp) ? itemsProp.length > 0 : !!label;

		const [open, setOpen] = useControlledState(
			false,
			openProp,
			setOpenProp as React.Dispatch<React.SetStateAction<boolean>>,
		);

		const containerRef = React.useRef<HTMLDivElement>(null);
		const pulse = () => {
			const el = containerRef.current;
			if (!el) return;

			const id = "--🥝ErrorRegion-pulse";
			const animations = el.getAnimations({ subtree: true });
			if (animations.find((animation) => animation.id === id)) return;

			el.animate(
				[
					{
						boxShadow: "0 0 0 0 var(--stratakit-color-border-attention-base)",
						opacity: 1,
					},
					{
						boxShadow:
							"0 0 15px 2px var(--stratakit-color-border-attention-base)",
						opacity: 0.7,
						offset: 0.5,
					},
					{
						boxShadow: "0 0 0 0 var(--stratakit-color-border-attention-base)",
						opacity: 1,
					},
				],
				{
					id,
					duration: 600,
					easing: "cubic-bezier(0.4, 0, 0.2, 1)",
					pseudoElement: "::before",
				},
			);
		};

		const store = useCollectionStore({
			setItems: (newItems) => {
				const prevItemsSet = new Set(prevItems.map((item) => item.id));
				const addedItems = newItems.filter(
					(item) => !prevItemsSet.has(item.id),
				);
				if (addedItems.length === 0) return;

				pulse();
				setLiveLabel(label);
			},
		});
		const prevItems = useStoreState(store, "items");

		// This label should be updated only when a new item is added.
		const [liveLabel, setLiveLabel] = React.useState(label);
		return (
			<>
				<VisuallyHidden aria-live="polite" aria-atomic={true}>
					{liveLabel === label ? liveLabel : undefined}
				</VisuallyHidden>
				<DialogProvider open={open} setOpen={setOpen}>
					<Role.section
						aria-labelledby={sectionLabelledBy}
						{...rest}
						className={cx("🥝ErrorRegion", props.className)}
						data-_sk-visible={visible}
						data-_sk-expanded={open}
						ref={forwardedRef}
					>
						<div className="🥝ErrorRegionContainer" ref={containerRef}>
							<DialogDisclosure
								className="🥝ErrorRegionHeader"
								render={<Button variant="ghost" />}
							>
								<StatusIcon tone="attention" className="🥝ErrorRegionIcon" />
								<Text
									render={<span />}
									id={labelId}
									className="🥝ErrorRegionLabel"
									variant="body-sm"
								>
									{label}
								</Text>
								<IconButtonPresentation inert variant="ghost">
									<ChevronDown />
								</IconButtonPresentation>
							</DialogDisclosure>
							<Dialog
								className="🥝ErrorRegionDialog"
								portal={false}
								modal={false}
								autoFocusOnShow={false}
								aria-labelledby={labelId}
							>
								<Collection
									store={store}
									className="🥝ErrorRegionItems"
									role="list"
								>
									{itemsProp}
								</Collection>
							</Dialog>
						</div>
					</Role.section>
				</DialogProvider>
			</>
		);
	},
);
DEV: ErrorRegionRoot.displayName = "ErrorRegion.Root";

// ----------------------------------------------------------------------------

interface ErrorRegionItemProps extends Omit<BaseProps, "children"> {
	/**
	 * The error message. Consumers might consider using `Anchor` component to link to the associated element in the UI.
	 */
	message?: React.ReactNode;
	/**
	 * The `id` of the message node which can be used to semantically associate the error item with the related UI item i.e. `Tree.Item`.
	 */
	messageId?: string;
	/**
	 * The actions available for this item. Must be a list of anchors, each rendered as a button using `<Anchor render={<button />} />`.
	 */
	actions?: React.ReactNode;
}

/**
 * An individual error item within the `ErrorRegion` component. It displays an error message and optional actions.
 *
 * The `messageId` prop can be used to semantically associate the error item with the related UI item, such as a `Tree.Item`.
 *
 * Example:
 * ```tsx
 * <ErrorRegion.Item
 *   message={<>Something went wrong with <Anchor href="item-10001">Item 10001</Anchor>.</>}
 *   messageId="item-10001-error"
 *   actions={<Button>Retry</Button>}
 * />
 *
 * <Tree.Item
 *   id="item-10001"
 *   label="Item 10001"
 *   error="item-10001-error"
 * />
 * ```
 */
const ErrorRegionItem = forwardRef<"div", ErrorRegionItemProps>(
	(props, forwardedRef) => {
		const generatedId = React.useId();

		const {
			message,
			messageId = `${generatedId}-message`,
			actions,
			...rest
		} = props;

		return (
			<CollectionItem
				{...rest}
				role="listitem"
				className={cx("🥝ErrorRegionItem", props.className)}
				ref={forwardedRef}
			>
				<Text id={messageId} variant="body-sm">
					{message}
				</Text>
				<div className="🥝ErrorRegionItemActions">{actions}</div>
			</CollectionItem>
		);
	},
);
DEV: ErrorRegionItem.displayName = "ErrorRegion.Item";

// -------------------------------------------------------------------------

export { ErrorRegionRoot as Root, ErrorRegionItem as Item };
