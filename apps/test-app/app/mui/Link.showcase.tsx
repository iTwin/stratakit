/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import LinkColors_ from "examples/mui/Link._colors.tsx";
import LinkDefault from "examples/mui/Link.default.tsx";
import { isProduction } from "~/~utils.tsx";

export default function LinkExamples() {
	return (
		<>
			<LinkDefault />
			{!isProduction && <LinkColors_ />}
		</>
	);
}
