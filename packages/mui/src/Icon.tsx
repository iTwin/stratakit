/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Icon } from "@stratakit/foundations";
import { svgArrowDown } from "@stratakit/icons/arrow-down";
import { svgCalendar } from "@stratakit/icons/calendar";
import { svgCaretsUpDown } from "@stratakit/icons/carets-up-down";
import { svgCheckmark } from "@stratakit/icons/checkmark";
import { svgChevronDown } from "@stratakit/icons/chevron-down";
import { svgChevronLeft } from "@stratakit/icons/chevron-left";
import { svgChevronLeftDouble } from "@stratakit/icons/chevron-left-double";
import { svgChevronRight } from "@stratakit/icons/chevron-right";
import { svgChevronRightDouble } from "@stratakit/icons/chevron-right-double";
import { svgClock } from "@stratakit/icons/clock";
import { svgDismiss } from "@stratakit/icons/dismiss";
import { svgDismissCircle } from "@stratakit/icons/dismiss-circle";
import { svgError } from "@stratakit/icons/error";
import { svgInfo } from "@stratakit/icons/info";
import { svgSortAscending } from "@stratakit/icons/sort-ascending";
import { svgSortDescending } from "@stratakit/icons/sort-descending";
import { svgStatusSuccess } from "@stratakit/icons/status-success";
import { svgWarning } from "@stratakit/icons/warning";

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

const CalendarIcon = createIconComponent(svgCalendar);
const ClockIcon = createIconComponent(svgClock);

const CheckmarkIcon = createIconComponent(svgCheckmark);

const CaretsUpDownIcon = createIconComponent(svgCaretsUpDown);

const ChevronDownIcon = createIconComponent(svgChevronDown);
const ChevronLeftIcon = createIconComponent(svgChevronLeft);
const ChevronLeftDoubleIcon = createIconComponent(svgChevronLeftDouble);
const ChevronRightIcon = createIconComponent(svgChevronRight);
const ChevronRightDoubleIcon = createIconComponent(svgChevronRightDouble);

const DismissIcon = createIconComponent(svgDismiss);
const DismissCircleIcon = createIconComponent(svgDismissCircle);

const ErrorIcon = createIconComponent(svgError);
const InfoIcon = createIconComponent(svgInfo);
const SuccessIcon = createIconComponent(svgStatusSuccess);
const WarningIcon = createIconComponent(svgWarning);

const SortAscendingIcon = createIconComponent(svgSortAscending);
const SortDescendingIcon = createIconComponent(svgSortDescending);

// ----------------------------------------------------------------------------

export {
	ArrowDownIcon,
	CalendarIcon,
	CaretsUpDownIcon,
	CheckmarkIcon,
	ChevronDownIcon,
	ChevronLeftDoubleIcon,
	ChevronLeftIcon,
	ChevronRightDoubleIcon,
	ChevronRightIcon,
	ClockIcon,
	DismissCircleIcon,
	DismissIcon,
	ErrorIcon,
	Icon,
	InfoIcon,
	SortAscendingIcon,
	SortDescendingIcon,
	SuccessIcon,
	WarningIcon,
};
