/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import MenuDefault from "examples/mui/Menu.default.tsx";
import MenuDense from "examples/mui/Menu.dense.tsx";
import MenuSelectable from "examples/mui/Menu.selectable.tsx";
import MenuListDefault_ from "examples/mui/MenuList._default.tsx";

export default function MenuExamples() {
	return (
		<>
			<MenuDefault />
			<MenuDense />
			<MenuSelectable />
			<MenuListDefault_ />
		</>
	);
}
