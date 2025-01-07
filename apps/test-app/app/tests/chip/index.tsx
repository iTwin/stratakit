/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Chip } from "@itwin/itwinui-react/bricks";

export const handle = { title: "Chip" };

export default definePage(function Page({ orientation, presentational }) {
	return (
		<>
			<Chip />
		</>
	);
});
