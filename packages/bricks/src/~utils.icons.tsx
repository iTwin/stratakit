/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Role } from "@ariakit/react/role";
import { Icon } from "@stratakit/foundations";
import { forwardRef } from "@stratakit/foundations/secret-internals";
import cx from "classnames";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

/** Creates an inline icon component for the specified `<path>` definition (`d` attribute). */
function createIconFromPath(d: string) {
	return forwardRef<"svg", Omit<BaseProps<"svg">, "children">>(
		(props, forwardedRef) => {
			return (
				<Icon
					render={
						<Role.svg
							width="16"
							height="16"
							fill="none"
							viewBox="0 0 16 16"
							{...props}
							ref={forwardedRef}
						>
							<path
								fill="currentColor"
								fillRule="evenodd"
								d={d}
								clipRule="evenodd"
							/>
						</Role.svg>
					}
				/>
			);
		},
	);
}

// ----------------------------------------------------------------------------

const disclosureIcons = {
	down: createIconFromPath("M8 10 5 7h6l-3 3Z"),
	right: createIconFromPath("M7 11V5l3 3-3 3Z"),
};

interface DisclosureArrowProps extends Omit<BaseProps<"svg">, "children"> {
	/**
	 * Which direction should the arrow point towards?
	 * @default "down"
	 */
	direction?: "down" | "right";
}

export const DisclosureArrow = forwardRef<"svg", DisclosureArrowProps>(
	(props, forwardedRef) => {
		const { direction = "down", ...rest } = props;

		const Element = disclosureIcons[direction];
		return (
			<Element
				{...rest}
				className={cx("🥝-disclosure-arrow", props.className)}
				ref={forwardedRef}
			/>
		);
	},
);
DEV: DisclosureArrow.displayName = "DisclosureArrow";

// ----------------------------------------------------------------------------

export const Checkmark = createIconFromPath(
	"M13.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0Z",
);
DEV: Checkmark.displayName = "Checkmark";

// ----------------------------------------------------------------------------

export const Dismiss = createIconFromPath(
	"M4.853 4.146a.5.5 0 1 0-.707.708L7.293 8l-3.147 3.146a.5.5 0 0 0 .707.708L8 8.707l3.146 3.147a.5.5 0 0 0 .707-.708L8.707 8l3.146-3.146a.5.5 0 1 0-.707-.708L8 7.293 4.853 4.146Z",
);
DEV: Dismiss.displayName = "Dismiss";

// ----------------------------------------------------------------------------

const statusIcons = {
	positive: createIconFromPath(
		"M7.748 1.726a.5.5 0 0 1 .504 0l5 2.916a.5.5 0 0 1 .248.432v5.852a.5.5 0 0 1-.248.431l-5 2.917a.5.5 0 0 1-.504 0l-5-2.916a.5.5 0 0 1-.248-.432V5.074a.5.5 0 0 1 .248-.432l5-2.916ZM8.756.862a1.5 1.5 0 0 0-1.512 0l-5 2.917A1.5 1.5 0 0 0 1.5 5.074v5.852a1.5 1.5 0 0 0 .744 1.295l5 2.917a1.5 1.5 0 0 0 1.512 0l5-2.917a1.5 1.5 0 0 0 .744-1.295V5.074a1.5 1.5 0 0 0-.744-1.295l-5-2.917Zm2.139 5.445a.5.5 0 0 0-.79-.614L6.953 9.746l-1.1-1.1a.5.5 0 0 0-.707.708l1.5 1.5a.5.5 0 0 0 .749-.047l3.5-4.5Z",
	),
	attention: createIconFromPath(
		"M8.354 2.06a.5.5 0 0 0-.708 0L2.061 7.647a.5.5 0 0 0 0 .707l5.585 5.586a.5.5 0 0 0 .708 0l5.585-5.586a.5.5 0 0 0 0-.707L8.354 2.061Zm-1.415-.707a1.5 1.5 0 0 1 2.122 0l5.585 5.586a1.5 1.5 0 0 1 0 2.122l-5.585 5.585a1.5 1.5 0 0 1-2.122 0L1.354 9.061a1.5 1.5 0 0 1 0-2.122l5.585-5.586ZM8.75 10.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM8.5 8.5v-3a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0Z",
	),
	critical: createIconFromPath(
		"M8.252 1.726a.5.5 0 0 0-.504 0l-5 2.916a.5.5 0 0 0-.248.432v5.852a.5.5 0 0 0 .248.431l5 2.917a.5.5 0 0 0 .504 0l5-2.916a.5.5 0 0 0 .248-.432V5.074a.5.5 0 0 0-.248-.432l-5-2.916ZM7.244.862a1.5 1.5 0 0 1 1.512 0l5 2.917a1.5 1.5 0 0 1 .744 1.295v5.852a1.5 1.5 0 0 1-.744 1.295l-5 2.917a1.5 1.5 0 0 1-1.512 0l-5-2.917a1.5 1.5 0 0 1-.744-1.295V5.074a1.5 1.5 0 0 1 .744-1.295l5-2.917ZM8.75 10.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM8.5 5.5a.5.5 0 0 0-1 0v3a.5.5 0 0 0 1 0v-3Z",
	),
	info: createIconFromPath(
		"M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM1 8a7 7 0 1 1 14 0A7 7 0 0 1 1 8Zm5.5-1.5a.5.5 0 0 0 0 1h1v3h-1a.5.5 0 1 0 0 1h3a.5.5 0 0 0 0-1h-1V7a.5.5 0 0 0-.5-.5H6.5Zm1.375-1a.625.625 0 1 0 0-1.25.625.625 0 0 0 0 1.25Z",
	),
} as const;

interface StatusIconProps extends Omit<BaseProps<"svg">, "children"> {
	tone: "positive" | "attention" | "critical" | "info";
}

export const StatusIcon = forwardRef<"svg", StatusIconProps>(
	(props, forwardedRef) => {
		const { tone, ...rest } = props;

		const Element = statusIcons[tone];
		return <Element {...rest} ref={forwardedRef} />;
	},
);
DEV: StatusIcon.displayName = "StatusIcon";

// ----------------------------------------------------------------------------

export const MoreHorizontal = createIconFromPath(
	"M3 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Zm6-1a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm5 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Z",
);
DEV: MoreHorizontal.displayName = "MoreHorizontal";

// ----------------------------------------------------------------------------

const ChevronDownBase = createIconFromPath(
	"M4.146 6.146a.5.5 0 0 1 .708 0L8 9.293l3.146-3.147a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 0 1 0-.708Z",
);

export const ChevronDown = forwardRef<
	"svg",
	Omit<BaseProps<"svg">, "children">
>((props, forwardedRef) => {
	return (
		<ChevronDownBase
			{...props}
			className={cx("🥝-chevron-down", props.className)}
			ref={forwardedRef}
		/>
	);
});
DEV: ChevronDown.displayName = "ChevronDown";
