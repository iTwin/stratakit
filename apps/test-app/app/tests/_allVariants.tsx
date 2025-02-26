/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { demoVariants as anchorDemoVariants } from "./anchor/index.tsx";
import { demoVariants as avatarDemoVariants } from "./avatar/index.tsx";
import { demoVariants as badgeDemoVariants } from "./badge/index.tsx";
import { demoVariants as buttonDemoVariants } from "./button/index.tsx";
import { demoVariants as checkboxDemoVariants } from "./checkbox/index.tsx";
import { demoVariants as chipDemoVariants } from "./chip/index.tsx";
import { demoVariants as dividerDemoVariants } from "./divider/index.tsx";
import { demoVariants as dropdownMenuDemoVariants } from "./dropdown-menu/index.tsx";
import { demoVariants as fieldDemoVariants } from "./field/index.tsx";
import { demoVariants as iconDemoVariants } from "./icon/index.tsx";
import { demoVariants as iconButtonDemoVariants } from "./icon-button/index.tsx";
import { demoVariants as kbdDemoVariants } from "./kbd/index.tsx";
import { demoVariants as listDemoVariants } from "./list/index.tsx";
import { demoVariants as radioDemoVariants } from "./radio/index.tsx";
import { demoVariants as rootDemoVariants } from "./root/index.tsx";
import { demoVariants as selectDemoVariants } from "./select/index.tsx";
import { demoVariants as spinnerDemoVariants } from "./spinner/index.tsx";
import { demoVariants as switchDemoVariants } from "./switch/index.tsx";
import { demoVariants as tableDemoVariants } from "./table/index.tsx";
import { demoVariants as tabsDemoVariants } from "./tabs/index.tsx";
import { demoVariants as textDemoVariants } from "./text/index.tsx";
import { demoVariants as textBoxDemoVariants } from "./text-box/index.tsx";
import { demoVariants as textareaDemoVariants } from "./textarea/index.tsx";
import { demoVariants as tooltipDemoVariants } from "./tooltip/index.tsx";
import { demoVariants as treeDemoVariants } from "./tree/index.tsx";

export const allDemoVariants: Record<string, Record<string, string>> = {
	Anchor: anchorDemoVariants,
	Avatar: avatarDemoVariants,
	Badge: badgeDemoVariants,
	Button: buttonDemoVariants,
	Checkbox: checkboxDemoVariants,
	Chip: chipDemoVariants,
	Divider: dividerDemoVariants,
	DropdownMenu: dropdownMenuDemoVariants,
	Field: fieldDemoVariants,
	Icon: iconDemoVariants,
	IconButton: iconButtonDemoVariants,
	Kbd: kbdDemoVariants,
	List: listDemoVariants,
	Radio: radioDemoVariants,
	Root: rootDemoVariants,
	Select: selectDemoVariants,
	Spinner: spinnerDemoVariants,
	Switch: switchDemoVariants,
	Table: tableDemoVariants,
	Tabs: tabsDemoVariants,
	Text: textDemoVariants,
	TextBox: textBoxDemoVariants,
	Textarea: textareaDemoVariants,
	Tooltip: tooltipDemoVariants,
	Tree: treeDemoVariants,
};
