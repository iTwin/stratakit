/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import CardActions from "examples/mui/Card.actions.tsx";
import CardDefault from "examples/mui/Card.default.tsx";
import CardLoading from "examples/mui/Card.loading.tsx";
import CardHeader from "examples/mui/Card.menu.tsx";
import CardSelected from "examples/mui/Card.selected.tsx";

export default function CardExamples() {
	return (
		<>
			<CardDefault />
			<CardActions />
			<CardHeader />
			<CardLoading />
			<CardSelected />
		</>
	);
}
