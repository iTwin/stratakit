/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { isBrowser, supportsPopover } from "./~utils.js";
import type { PopoverStore } from "@ariakit/react/popover";
import {
	createStore as createZStore,
	useStore as useZStoreState,
	type StateCreator as ZStateCreator,
	type StoreApi as ZStore,
} from "zustand";
import { useStoreState as useAkStoreState } from "@ariakit/react/store";

/**
 * SSR-safe wrapper over `React.useLayoutEffect`.
 *
 * @see https://fb.me/react-uselayouteffect-ssr
 *
 * @private
 */
export const useLayoutEffect = isBrowser
	? React.useLayoutEffect
	: React.useEffect;

/**
 * Wrapper over `useState` that always gives preference to the
 * controlled state (which often comes from a prop).
 *
 * This is helpful when a component needs to support both uncontrolled
 * and controlled states. If controlled value/setter is not passed,
 * then it will work just like a regular `useState`.
 *
 * ```tsx
 * const [state, setState] = useControlledState(
 *   props.defaultValue,
 *   props.value,
 *   props.onChange
 * );
 * ```
 *
 * @private
 */
export function useControlledState<T>(
	initialValue: T,
	controlledState: T | undefined,
	setControlledState?: React.Dispatch<React.SetStateAction<T>>,
) {
	const [uncontrolledState, setUncontrolledState] =
		React.useState<T>(initialValue);

	const state = React.useMemo(
		() => (controlledState !== undefined ? controlledState : uncontrolledState),
		[controlledState, uncontrolledState],
	);

	const setControlledStateRef = useLatestRef(setControlledState);

	const setState = React.useCallback(
		(value) => {
			setUncontrolledState(value);
			setControlledStateRef.current?.(value);
		},
		[setControlledStateRef],
	) as React.Dispatch<React.SetStateAction<T>>;

	return [state, setState] as const;
}

/**
 * Hook that keeps track of the latest value in a ref.
 * This is useful for referencing unmemoized values inside Effects.
 *
 * ```tsx
 * const valueRef = useLatestRef(props.value);
 * ```
 *
 * @private
 */
export function useLatestRef<T>(value: T) {
	const valueRef = React.useRef<T>(value);

	React.useInsertionEffect(() => {
		valueRef.current = value;
	});

	return valueRef;
}

/**
 * Returns a memoized callback ref that merges the provided refs.
 *
 * ```tsx
 * const mergedRef = useMergedRefs(ref1, ref2);
 * ```
 *
 * This is useful when you need to internally use a ref in a component
 * and also need to forward its ref.
 *
 * ```tsx
 * const internalRef = useRef(null);
 * return <div ref={useMergedRefs(internalRef, forwardedRef)} />;
 * ```
 *
 * @private
 */
export function useMergedRefs<T>(
	...refs: ReadonlyArray<React.Ref<T> | React.LegacyRef<T> | undefined | null>
) {
	// biome-ignore lint/correctness/useExhaustiveDependencies: we are spreading the refs instead of referencing the array
	return React.useCallback(
		(instance: T | null) => {
			for (const ref of refs) {
				if (typeof ref === "function") {
					ref(instance);
				} else if (ref) {
					(ref as React.MutableRefObject<T | null>).current = instance;
				}
			}
		},
		[...refs],
	);
}

/**
 * Hook that accepts a list of event handlers and returns a single memoized handler
 * that ensures `defaultPrevented` is respected for each handler.
 *
 * The memoization technique used by this hook ensures that only the "latest" handlers are ever called.
 * The "latest" handlers are stored in a ref and updated on each render in an insertion effect. The result
 * is that the handlers passed to this hook do not always need to be memoized.
 *
 * Example:
 * ```tsx
 * <button onClick={useEventHandlers(props.onClick, ownOnClick)}>
 * ```
 *
 * @private
 */
export function useEventHandlers<E extends React.SyntheticEvent>(
	...handlers: Array<((event: E) => void) | undefined>
) {
	const latestHandlers = useLatestRef(handlers);

	return React.useCallback(
		(event: E) => {
			for (const handler of latestHandlers.current) {
				handler?.(event);
				if (event.defaultPrevented) return;
			}
		},
		[latestHandlers],
	);
}

/**
 * Wrapper hook around `useContext` to ensure that the Context is provided.
 * The component calling this hook will throw an error if the Context is not found.
 *
 * The Context's `displayName` will be used for a more useful error message.
 *
 * @private
 */
export function useSafeContext<C>(context: React.Context<C>) {
	const value = React.useContext(context);

	if (value === undefined) {
		throw new Error(`${context.displayName || "Context"} is undefined`);
	}

	return value;
}

/**
 * Hook that makes it easy to use the [Popover API](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API).
 *
 * Accepts an Ariakit store of a popover-like component, and returns a
 * set of props that should be passed back to the component.
 *
 * Internally, this hook will sync the `open` state of the store with the
 * DOM element.
 *
 * @private
 */
export function usePopoverApi(store: PopoverStore | undefined) {
	const open = useStoreState(store, (state) => state?.open);
	const popover = useStoreState(store, (state) => state?.popoverElement);

	React.useEffect(
		function syncPopoverWithOpenState() {
			if (popover?.isConnected) {
				popover?.togglePopover?.(open);
			}
		},
		[open, popover],
	);

	return React.useMemo(
		() =>
			({
				portal: !supportsPopover,
				style: { zIndex: supportsPopover ? undefined : 9999 },
				wrapperProps: { popover: "manual" },
			}) as const,
		[],
	);
}

/**
 * Hook that returns false initially, then returns true after the first client render.
 * Useful to guard against using client APIs during SSR.
 *
 * Note: This will return `false` during hydration.
 *
 * @private
 */
export function useIsClient() {
	const [isClient, setIsClient] = React.useState(false);

	React.useEffect(() => {
		setIsClient(true);
	}, []);

	return isClient;
}

// ----------------------------------------------------------------------------

export type Store<S = Record<string, unknown>> = Pick<
	ZStore<S>,
	"getState" | "setState"
> &
	Pick<Partial<ZStore<S>>, "subscribe" | "getInitialState">;

/**
 * Wrapper over Zustand's `createStore` that puts the store in React state,
 * so that it can be passed into a React Context.
 *
 * Should be used in conjunction with {@link useStoreState}.
 *
 * Example:
 * ```tsx
 * type CountStore = { count: 0; increment: () => void; decrement: () => void; };
 * const CountStoreContext = React.createContext<Store<CountStore>>();
 *
 * function CounterRoot() {
 *   const countStore = useCreateStore<CountStore>((set) => ({
 *     count: 0,
 *     increment: () => set((state) => ({ count: state.count + 1 })),
 *     decrement: () => set((state) => ({ count: state.count - 1 })),
 *   }));
 *   const increment = useStoreState(countStore, (state) => state.increment);
 *   const decrement = useStoreState(countStore, (state) => state.decrement);
 *
 *   return (
 *     <CountStoreContext.Provider value={countStore}>
 *       <button onClick={increment}>Increment</button>
 *       <Count />
 *       <button onClick={decrement}>Decrement</button>
 *     </CountStoreContext.Provider>
 *   );
 * }
 * ```
 *
 * @see https://zustand.docs.pmnd.rs/apis/create-store
 */
export function useCreateStore<T>(creator: ZStateCreator<T, [], []>) {
	const [store] = React.useState(() =>
		Object.assign(createZStore<T>(creator), { [Symbol.for("🥝")]: true }),
	);
	return store as Store<T>;
}

/**
 * Hook that returns the state of a either a Zustand store or an Ariakit store.
 *
 * Example (Zustand + {@link useCreateStore}):
 * ```jsx
 * const countStore = useSafeContext(CountStoreContext);
 * const count = useStoreState(countStore, (state) => state.count);
 * ```
 *
 * Example (Ariakit):
 * ```jsx
 * const comboboxStore = Ariakit.useComboboxContext();
 * const open = useStoreState(comboboxStore, (state) => state.open);
 * ```
 *
 * @see https://zustand.docs.pmnd.rs/hooks/use-store
 * @see https://ariakit.org/reference/use-store-state
 */
export function useStoreState<T, V>(
	store: Store<T> | undefined,
	selector: (state: T) => V,
): V {
	const isZustandStore = store && Symbol.for("🥝") in store;
	const useStoreStateHook = isZustandStore ? useZStoreState : useAkStoreState;

	// @ts-expect-error -- store is not undefined
	return useStoreStateHook(store, selector);
}
