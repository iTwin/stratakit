/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import Button from "@stratakit/bricks/Button";
import Tooltip from "@stratakit/bricks/Tooltip";
import VisuallyHidden from "@stratakit/bricks/VisuallyHidden";
import { Icon } from "@stratakit/foundations";
import {
	forwardRef,
	useMergedRefs,
} from "@stratakit/foundations/secret-internals";
import { Dot } from "./~utils.Dot.js";
import {
	IconButtonContext,
	IconButtonPresentation,
} from "./IconButton.internal.js";

interface IconButtonProps
	extends Omit<React.ComponentProps<typeof Button>, "children" | "tone"> {
	/**
	 * Accessible name for the button.
	 *
	 * This label gets used by assistive technology to identify the button,
	 * and also gets shown in a tooltip by default.
	 */
	label: string;
	/**
	 * Icon to be displayed inside the button.
	 *
	 * Can be a URL of an SVG from the `@stratakit/icons` package,
	 * or a custom JSX icon.
	 */
	icon: string | React.JSX.Element;
	/**
	 * Behavior of the label.
	 *
	 * By default, the label is shown in a tooltip. Use `"visually-hidden"` to
	 * hide the label from sighted users.
	 *
	 * @default "tooltip"
	 */
	labelVariant?: "tooltip" | "visually-hidden";
	/**
	 * A small dot displayed in the corner of the icon.
	 *
	 * The value of this prop gets used as the button's "accessible description".
	 *
	 * Example:
	 * ```tsx
	 * <IconButton
	 *   label="Messages"
	 *   dot="You have unread messages"
	 *   icon={…}
	 * />
	 * ```
	 */
	dot?: string;
	/**
	 * Whether the button is in a toggled state and currently "active" (toggled on).
	 *
	 * For regular buttons, setting this prop to `true` or `false` will turn this button into a toggle button.
	 * The button will have an `aria-pressed` attribute and extra styling for the "active" state.
	 * When this prop is `undefined`, the button will be a regular button (no `aria-pressed` attribute).
	 *
	 * When the button is rendered as an anchor (`<a>`), this prop maps to `aria-current` instead of `aria-pressed`.
	 *
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed
	 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-current
	 *
	 * @default undefined
	 */
	active?: boolean;
}

/**
 * An icon-only button, with a required accessible name.
 *
 * The icon can be a URL from the `@stratakit/icons` package:
 * ```tsx
 * <IconButton
 *   label="Reveal full content"
 *   icon={new URL("@stratakit/icons/arrow.svg", import.meta.url).href}
 * />
 * ```
 *
 * Alternatively, pass a JSX node such as an `<Icon>`.
 * ```tsx
 * <IconButton
 *   label={…}
 *   icon={<Icon href={…} />}
 *   variant="ghost"
 * />
 * ```
 *
 * The `active` prop can be used to turn this button into a toggle button.
 * ```tsx
 * const [active, setActive] = React.useState(false);
 *
 * <IconButton
 *   label={…}
 *   icon={…}
 *   active={active}
 *   onClick={() => setActive(!active)}
 * />
 * ```
 */
const IconButton = forwardRef<"button", IconButtonProps>(
	(props, forwardedRef) => {
		const { label, icon, active, labelVariant, dot, ...rest } = props;

		const baseId = React.useId();
		const labelId = `${baseId}-label`;
		const dotId = `${baseId}-dot`;

		const { iconSize } = React.useContext(IconButtonContext);

		const [elementType, setElementType] = React.useState<
			"button" | "a" | undefined
		>(!props.render ? "button" : undefined);

		const determineTagName = React.useCallback(
			(element: HTMLElement | null) => {
				if (!element) return;
				setElementType(element.tagName.toLowerCase() === "a" ? "a" : "button");
			},
			[],
		);

		const button = (
			<IconButtonPresentation
				render={
					<Button
						aria-pressed={elementType === "button" ? active : undefined}
						aria-current={elementType === "a" ? active : undefined}
						aria-labelledby={labelId}
						aria-describedby={dot ? dotId : undefined}
						{...rest}
						ref={useMergedRefs(determineTagName, forwardedRef)}
					>
						<VisuallyHidden id={labelId}>{label}</VisuallyHidden>

						{typeof icon === "string" ? (
							<Icon href={icon} size={iconSize} />
						) : (
							icon
						)}

						{dot ? (
							<Dot id={dotId} className="🥝IconButtonDot">
								{dot}
							</Dot>
						) : null}
					</Button>
				}
			/>
		);

		if (labelVariant === "visually-hidden") {
			return button;
		}

		return (
			<Tooltip content={label} type="none">
				{button}
			</Tooltip>
		);
	},
);
DEV: IconButton.displayName = "IconButton";

// ----------------------------------------------------------------------------

export default IconButton;
