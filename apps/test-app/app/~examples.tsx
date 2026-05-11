/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon } from "@stratakit/mui";

import type * as React from "react";

import svgLink from "@stratakit/icons/link.svg";
import styles from "./~examples.module.css";

// ----------------------------------------------------------------------------

interface ExamplesContainerProps {
	name: string;
	id: string;
	children: React.ReactNode;
	highlight?: boolean;
	tools?: React.ReactNode;
}

export function ExamplesContainer(props: ExamplesContainerProps) {
	const { name, id, highlight, tools, children } = props;

	const toolbar = tools && (
		<div
			role="group"
			aria-labelledby={`${id}-actions ${id}`}
			className={styles.exampleToolbar}
		>
			<p hidden id={`${id}-actions`}>
				Actions
			</p>
			{tools}
		</div>
	);

	return (
		<section
			className={styles.exampleContainer}
			aria-labelledby={id}
			data-highlight={highlight ? "true" : undefined}
		>
			<hgroup className={styles.exampleHeader}>
				<Typography
					variant="h5"
					render={<h2 />}
					id={id}
					className={styles.exampleTitle}
					tabIndex={-1}
				>
					{name}
				</Typography>
				<IconButton
					render={<a />}
					id={`${id}-permalink`}
					aria-labelledby={`${id}-permalink ${id}`}
					className={styles.examplePermalink}
					href={`#${id}`}
				>
					<Icon href={svgLink} />
					<span style={visuallyHidden}>Permalink</span>
				</IconButton>
			</hgroup>

			<div className={styles.exampleContent}>
				{toolbar}
				{children}
			</div>
		</section>
	);
}
