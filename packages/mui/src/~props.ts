/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import type { RoleProps } from "@ariakit/react/role";

// ----------------------------------------------------------------------------

/** Element type props merged with custom props. */
type MergeProps<
	ElementType extends React.ElementType,
	CustomProps extends Record<string, unknown>,
> = CustomProps &
	Omit<React.ComponentPropsWithoutRef<ElementType>, keyof CustomProps>;

/** Base component props with custom props. */
type BaseProps<ElementType extends React.ElementType = "div"> = MergeProps<
	ElementType,
	Pick<RoleProps, "render">
>;

// ----------------------------------------------------------------------------

export type { BaseProps };
