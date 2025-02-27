/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";

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

	// biome-ignore lint/style/noNonNullAssertion: we already checked for undefined
	return value!;
}
