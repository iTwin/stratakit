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

	React.useEffect(() => {
		valueRef.current = value;
	}, [value]);

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
 * The first callback in the list is also optimized using `useLatestRef` to avoid
 * breaking memoization. This is useful when the first handler is a prop that can change.
 *
 * Example:
 * ```tsx
 * <button onClick={useEventHandlers(props.onClick, ownOnClick)}>
 * ```
 *
 * @private
 */
export function useEventHandlers<E extends React.SyntheticEvent>(
	first: ((event: E) => void) | undefined,
	...rest: Array<((event: E) => void) | undefined>
) {
	const latestFirst = useLatestRef(first);

	// biome-ignore lint/correctness/useExhaustiveDependencies: Memoize based on contents of rest, not rest itself.
	return React.useCallback(
		(event: E) => {
			for (const handler of [latestFirst.current, ...rest]) {
				handler?.(event);
				if (event.defaultPrevented) return;
			}
		},
		[latestFirst, ...rest],
	);
}
