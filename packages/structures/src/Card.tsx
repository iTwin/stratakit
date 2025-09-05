/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	forwardRef,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { createStore, type ExtractState, useStore } from "zustand";
import { combine } from "zustand/middleware";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

type CardState = ExtractState<ReturnType<typeof createCardStore>>;

function createCardStore(initialState: { titleId?: string }) {
	return createStore(
		combine(initialState, (set, _, store) => ({
			setTitleId: (titleId?: string) =>
				set({ titleId: titleId || store.getInitialState().titleId }),
		})),
	);
}

const CardContext = React.createContext<
	ReturnType<typeof createCardStore> | undefined
>(undefined);

function CardProvider(props: React.PropsWithChildren) {
	const defaultTitleId = React.useId();
	const [store] = React.useState(() =>
		createCardStore({ titleId: defaultTitleId }),
	);

	return (
		<CardContext.Provider value={store}>{props.children}</CardContext.Provider>
	);
}

function useCardState<P>(selectorFn: (state: CardState) => P): P {
	const store = useSafeContext(CardContext);
	return useStore(store, selectorFn);
}

// ----------------------------------------------------------------------------

interface CardRootProps extends BaseProps<"div"> {}

/**
 * A Card component can be used for compactly displaying information and actions
 * about a single subject. The Card may link to another page which contains more
 * detailed information about the subject.
 *
 * Example:
 * ```tsx
 * <Card.Root>
 *   <Card.Title>The subject</Card.Title>
 *   <Card.Body>
 *     <Text variant="body-sm">A description of the subject</Text>
 *  </Card.Body>
 * </Card.Root>
 * ```
 *
 * Renders with role="group" by default and is labelled by the `Card.Title`.
 */
const CardRoot = forwardRef<"div", CardRootProps>((props, forwardedRef) => {
	return (
		<CardProvider>
			<CardRootInner {...props} ref={forwardedRef} />
		</CardProvider>
	);
});
DEV: CardRoot.displayName = "Card.Root";

const CardRootInner = forwardRef<"div", CardRootProps>(
	(props, forwardedRef) => {
		const titleId = useCardState((state) => state.titleId);
		return (
			<Role.div
				role="group"
				aria-labelledby={titleId}
				{...props}
				className={cx("🥝Card", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: CardRootInner.displayName = "Card.RootInner";

// ----------------------------------------------------------------------------

interface CardTitleProps extends BaseProps<"h2"> {}

/**
 * `Card.Title` is the title that identifies the Card.
 *
 * Renders as an h2 heading by default.
 */
const CardTitle = forwardRef<"h2", CardTitleProps>(
	function CardTitle(props, forwardedRef) {
		const titleId = useCardState((state) => state.titleId);
		const setTitleId = useCardState((state) => state.setTitleId);

		React.useEffect(() => {
			setTitleId(props.id);
		}, [props.id, setTitleId]);

		return (
			<Role.h2
				id={titleId}
				{...props}
				className={cx("🥝CardTitle", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: CardTitle.displayName = "Card.Title";

// ----------------------------------------------------------------------------

interface CardBodyProps extends BaseProps<"div"> {}

/**
 * `Card.Body` contains the main content of the Card.
 */
const CardBody = forwardRef<"div", CardBodyProps>(
	function CardBody(props, forwardedRef) {
		return (
			<Role.div
				{...props}
				className={cx("🥝CardBody", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: CardBody.displayName = "Card.Body";

// ----------------------------------------------------------------------------

export { CardRoot as Root, CardTitle as Title, CardBody as Body };
