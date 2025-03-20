/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Banner } from "@itwin/itwinui-react/bricks";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import * as React from "react";

export const handle = { title: "Banner" };

export default definePage(
	function Page({ disabled, render: renderParam }) {
		const render = renderParam ? <button /> : undefined;
		return (
			<>
				<Banner label="Title" icon={placeholderIcon}>
					Message
				</Banner>
			</>
		);
	},
	{ visual: VisualTest },
);

function VisualTest() {
	const tones = [
		"neutral",
		"info",
		"positive",
		"attention",
		"critical",
	] as const;

	const variants = ["outline", "solid"] as const;

	const [isDismissed, setIsDismissed] = React.useState(false);

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{variants.map((variant) => (
				<div key={variant} style={{ display: "grid", gap: 4 }}>
					{tones.map((tone) => {
						if (variant === "solid" && tone === "neutral") {
							return null;
						}
						const sentenceCaseTone =
							tone.charAt(0).toUpperCase() + tone.slice(1).toLowerCase();
						return (
							<Banner
								icon={placeholderIcon}
								label={sentenceCaseTone}
								key={tone}
								tone={tone}
								variant={variant}
								onDismiss={() => {
									setIsDismissed(true);
								}}
								data-dismissed={isDismissed}
							>
								Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris
							</Banner>
						);
					})}
				</div>
			))}
		</div>
	);
}
