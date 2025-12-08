/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";

import svgArrowDown from "@stratakit/icons/arrow-down.svg";
import svgCaretsUpDown from "@stratakit/icons/carets-up-down.svg";
import svgChevronDown from "@stratakit/icons/chevron-down.svg";
import svgChevronLeft from "@stratakit/icons/chevron-left.svg";
import svgChevronLeftDouble from "@stratakit/icons/chevron-left-double.svg";
import svgChevronRight from "@stratakit/icons/chevron-right.svg";
import svgChevronRightDouble from "@stratakit/icons/chevron-right-double.svg";
import svgDismiss from "@stratakit/icons/dismiss.svg";
import svgError from "@stratakit/icons/error.svg";
import svgInfo from "@stratakit/icons/info.svg";
import svgStatusSuccess from "@stratakit/icons/status-success.svg";
import svgWarning from "@stratakit/icons/warning.svg";

// ----------------------------------------------------------------------------

function createIconComponent(href: string) {
	return React.forwardRef<SVGSVGElement, React.SVGProps<SVGSVGElement>>(
		function IconComponent(props, forwardedRef) {
			return <Icon {...props} href={href} ref={forwardedRef} />;
		},
	);
}

// ----------------------------------------------------------------------------

const ArrowDownIcon = createIconComponent(svgArrowDown);

const CaretsUpDownIcon = createIconComponent(svgCaretsUpDown);

const ChevronDownIcon = createIconComponent(svgChevronDown);
const ChevronLeftIcon = createIconComponent(svgChevronLeft);
const ChevronLeftDoubleIcon = createIconComponent(svgChevronLeftDouble);
const ChevronRightIcon = createIconComponent(svgChevronRight);
const ChevronRightDoubleIcon = createIconComponent(svgChevronRightDouble);

const DismissIcon = createIconComponent(svgDismiss);

const ErrorIcon = createIconComponent(svgError);
const InfoIcon = createIconComponent(svgInfo);
const SuccessIcon = createIconComponent(svgStatusSuccess);
const WarningIcon = createIconComponent(svgWarning);

// ----------------------------------------------------------------------------

export {
	Icon,
	ArrowDownIcon,
	CaretsUpDownIcon,
	ChevronDownIcon,
	ChevronLeftIcon,
	ChevronLeftDoubleIcon,
	ChevronRightIcon,
	ChevronRightDoubleIcon,
	DismissIcon,
	InfoIcon,
	SuccessIcon,
	WarningIcon,
	ErrorIcon,
};
