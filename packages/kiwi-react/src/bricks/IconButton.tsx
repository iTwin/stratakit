/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import cx from "classnames";
import { Button } from "./Button.js";
import { VisuallyHidden } from "./VisuallyHidden.js";
import { Icon } from "./Icon.js";
import { Tooltip } from "./Tooltip.js";

interface IconButtonBaseProps
	extends Omit<React.ComponentProps<typeof Button>, "children"> {
	/**
	 * Accessible name for the button.
	 *
	 * This label gets used by assistive technology to identify the button,
	 * and also gets shown in a tooltip when hovering/focusing the button.
	 */
	label: string;
	/**
	 * Icon to be displayed inside the button.
	 *
	 * Can be a URL of an SVG from the `kiwi-icons` package,
	 * or a custom JSX icon.
	 */
	icon: string | React.JSX.Element;
}

type IconButtonExtraProps =
	| {
			variant: "ghost";
			/**
			 * Whether the button is in a toggled state and currently "active" (toggled on).
			 *
			 * Setting this prop to `true` or `false` will turn this button into a toggle button.
			 * The button will have an `aria-pressed` attribute and extra styling for the "active" state.
			 * When this prop is `undefined`, the button will be a regular button (no `aria-pressed` attribute).
			 *
			 * **Note:** This prop is only available with `variant="ghost"`.
			 *
			 * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-pressed
			 *
			 * @default undefined
			 */
			isActive?: boolean;
	  }
	| {
			variant?: Omit<React.ComponentProps<typeof Button>["variant"], "ghost">;
			isActive?: never;
	  };

type IconButtonProps = IconButtonBaseProps & IconButtonExtraProps;

/**
 * An icon-only button, with a required accessible name.
 *
 * The icon can be a URL from the `kiwi-icons` package:
 * ```tsx
 * <IconButton
 *   label="Reveal full content"
 *   icon={new URL("@itwin/kiwi-icons/icons/arrow.svg", import.meta.url).href}
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
 * The `isActive` prop can be used to turn this button into a toggle button.
 * ```tsx
 * const [isActive, setIsActive] = React.useState(false);
 *
 * <IconButton
 *   label={…}
 *   icon={…}
 *   isActive={isActive}
 *   onClick={() => setIsActive(!isActive)}
 * />
 */
export const IconButton = React.forwardRef<
	React.ElementRef<typeof Button>,
	IconButtonProps
>((props, forwardedRef) => {
	const { label, icon, isActive, ...rest } = props;

	return (
		<Tooltip content={label} type="none">
			<Button
				aria-pressed={isActive}
				{...rest}
				className={cx("🥝-icon-button", props.className)}
				ref={forwardedRef}
			>
				<VisuallyHidden>{label}</VisuallyHidden>
				{typeof icon === "string" ? <Icon href={icon} /> : icon}
			</Button>
		</Tooltip>
	);
});
