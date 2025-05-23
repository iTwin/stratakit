/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

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
import * as React from "react";
import { ChevronDown, StatusIcon } from "./~utils.icons.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

interface ErrorRegionRootProps extends Omit<BaseProps, "children"> {
	/**
	 * Label for the error header, usually indicating the number of errors displayed.
	 * By default this is used as a name of the region navigational landmark, however an explicit `aria-label` or `aria-labelledby` is strongly suggested.
	 *
	 * Use `undefined` if you don't want to display errors rather than conditionally rendering the component.
	 */
	label?: React.ReactNode;
	/**
	 * A list of error items where each item describes an individual error. Must be a list of `ErrorRegion.Item` components.
	 */
	items?: React.ReactNode;
	/**
	 * The controlled expanded state of the error.
	 */
	expanded?: boolean;
	/**
	 * Callback fired when the error is expanded.
	 *
	 * Should be used with the `expanded` prop.
	 */
	onExpandedChange?: (expanded: boolean) => void;
}

/**
 * A collapsible region that displays a list of error messages, which might originate from another
 * component, such as `Tree`.
 *
 * This component is rendered as a [region landmark](https://www.w3.org/WAI/ARIA/apg/patterns/landmarks/examples/region.html)
 * and should be labelled either using `label` or `aria-label`/`aria-labelledby`. Changes to the `label` prop will be
 * announced communicated using a [live region](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions).
 *
 * Example:
 * ```tsx
 * <ErrorRegion.Root
 *   label="3 issues found"
 *   items={
 *     <>
 *       <ErrorRegion.Item message="…" />
 *       <ErrorRegion.Item message="…" />
 *       <ErrorRegion.Item message="…" />
 *     </>
 *   }
 * />
 */
const ErrorRegionRoot = forwardRef<"div", ErrorRegionRootProps>(
	(props, forwardedRef) => {
		const { label, items, expanded, onExpandedChange, ...rest } = props;
		const labelId = React.useId();
		const sectionLabelledBy =
			props["aria-labelledby"] ?? (props["aria-label"] ? undefined : labelId);

		const [open, setOpen] = useControlledState(
			false,
			expanded,
			onExpandedChange as React.Dispatch<React.SetStateAction<boolean>>,
		);

		const containerRef = React.useRef<HTMLDivElement>(null);
		const pulse = () => {
			const el = containerRef.current;
			if (!el) return;

			const id = "--🥝error-region-pulse";
			const animations = el.getAnimations({ subtree: true });
			if (animations.find((animation) => animation.id === id)) return;

			el.animate(
				[
					{
						boxShadow: "0 0 0 0 var(--ids-color-border-attention-base)",
						opacity: 1,
					},
					{
						boxShadow: "0 0 15px 2px var(--ids-color-border-attention-base)",
						opacity: 0.7,
						offset: 0.5,
					},
					{
						boxShadow: "0 0 0 0 var(--ids-color-border-attention-base)",
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
						{...rest}
						aria-labelledby={sectionLabelledBy}
						className={cx("🥝-error-region", props.className)}
						data-kiwi-visible={!!label}
						data-kiwi-expanded={open}
						ref={forwardedRef}
					>
						<div className="🥝-error-region-container" ref={containerRef}>
							<DialogDisclosure
								className="🥝-error-region-header"
								render={<Button variant="ghost" />}
							>
								<StatusIcon tone="attention" className="🥝-error-region-icon" />
								<Text
									render={<span />}
									id={labelId}
									className="🥝-error-region-label"
									variant="body-sm"
								>
									{label}
								</Text>
								<IconButtonPresentation inert variant="ghost">
									<ChevronDown />
								</IconButtonPresentation>
							</DialogDisclosure>
							<Dialog
								className="🥝-error-region-dialog"
								portal={false}
								modal={false}
								autoFocusOnShow={false}
								aria-labelledby={labelId}
							>
								<Collection
									store={store}
									className="🥝-error-region-items"
									role="list"
								>
									{items}
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
				className={cx("🥝-error-region-item", props.className)}
				ref={forwardedRef}
			>
				<Text id={messageId} variant="body-sm">
					{message}
				</Text>
				<div className="🥝-error-region-item-actions">{actions}</div>
			</CollectionItem>
		);
	},
);
DEV: ErrorRegionItem.displayName = "ErrorRegion.Item";

// -------------------------------------------------------------------------

export { ErrorRegionRoot as Root, ErrorRegionItem as Item };
