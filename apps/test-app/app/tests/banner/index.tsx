/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Anchor, Banner, Button } from "@itwin/itwinui-react/bricks";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import * as React from "react";

export const handle = { title: "Banner" };

export default definePage(
	function Page() {
		return (
			<Banner label="Title" icon={placeholderIcon} onDismiss={() => {}}>
				Message
			</Banner>
		);
	},
	{ visual: VisualTest, dismiss: DismissibleTest, actions: ActionsTest },
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
								icon={
									(tone === "neutral" ? placeholderIcon : undefined) as string
								}
								label={sentenceCaseTone}
								key={tone}
								tone={tone as "neutral"}
								variant={variant as "outline"}
								onDismiss={() => {
									setIsDismissed(true);
								}}
								data-dismissed={isDismissed}
								actions={[<Button key="1">Action</Button>]}
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

function DismissibleTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Banner
				icon={placeholderIcon}
				label="Title"
				onDismiss={() => {
					console.log("Dismissed");
				}}
			>
				Message
			</Banner>
			<Banner icon={placeholderIcon} label="Title">
				Message
			</Banner>
		</div>
	);
}

function ActionsTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<ActionsTextBanner actions={[<Button key="1">Manage cookies</Button>]} />
			<ActionsTextBanner
				actions={[
					<Anchor key="1" render={<button />}>
						Manage cookies
					</Anchor>,
				]}
			/>
			<ActionsTextBanner
				actions={[
					<Button key="1">Manage cookies</Button>,
					<Button key="2">Don't show again</Button>,
				]}
			/>
			<ActionsTextBanner
				actions={[
					<Anchor key="1" render={<button />}>
						Manage cookies
					</Anchor>,
					<Anchor key="2" render={<button />}>
						Don't show again
					</Anchor>,
				]}
			/>
		</div>
	);
}

function ActionsTextBanner({ actions }: { actions: React.ReactNode[] }) {
	return (
		<Banner
			icon={placeholderIcon}
			label="Privacy Notice"
			onDismiss={() => {
				console.log("Dismissed");
			}}
			actions={actions}
		>
			This site uses cookies to improve your experience.
		</Banner>
	);
}
