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
