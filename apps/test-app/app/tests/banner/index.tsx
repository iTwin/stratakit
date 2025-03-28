/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import { Anchor, Banner, Button } from "@itwin/itwinui-react/bricks";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";
import type * as React from "react";

export const handle = { title: "Banner" };

export default definePage(
	function Page() {
		return <Banner message="Message" />;
	},
	{
		visual: VisualTest,
		customIcons: CustomIcons,
		dismiss: DismissibleTest,
		actions: ActionsTest,
	},
);

function VisualTest({ customIcon = false }: { customIcon?: boolean }) {
	const tones = [
		"neutral",
		"info",
		"positive",
		"attention",
		"critical",
	] as const;

	return (
		<div style={{ display: "grid", gap: 4 }}>
			<div style={{ display: "grid", gap: 4 }}>
				{tones.map((tone) => {
					const sentenceCaseTone =
						tone.charAt(0).toUpperCase() + tone.slice(1).toLowerCase();
					return (
						<Banner
							icon={customIcon ? placeholderIcon : undefined}
							label={sentenceCaseTone}
							message={`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								enim ad minim veniam, quis nostrud exercitation ullamco laboris`}
							key={tone}
							tone={tone}
							variant="outline"
							onDismiss={() => {
								console.log("Dismissed");
							}}
							actions={<Button key="1">Action</Button>}
						/>
					);
				})}
			</div>
		</div>
	);
}

function CustomIcons() {
	return VisualTest({ customIcon: true });
}

function DismissibleTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Banner message="Banner" />
			<Banner
				message="Banner with dismiss button"
				onDismiss={() => {
					console.log("Dismissed");
				}}
			/>
			<Banner
				label="Privacy Notice"
				message="Banner with dismiss button and label"
				onDismiss={() => {
					console.log("Dismissed");
				}}
			/>
		</div>
	);
}

function ActionsTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<ActionsTextBanner actions={<Button key="1">Manage cookies</Button>} />
			<ActionsTextBanner
				actions={
					<Anchor key="1" render={<button />}>
						Manage cookies
					</Anchor>
				}
			/>
			<ActionsTextBanner
				actions={
					<>
						<Button key="1">Manage cookies</Button>
						<Button key="2">Don't show again</Button>
					</>
				}
			/>
			<ActionsTextBanner
				actions={
					<>
						<Anchor key="1" render={<button />}>
							Manage cookies
						</Anchor>
						<Anchor key="2" render={<button />}>
							Don't show again
						</Anchor>
					</>
				}
			/>
		</div>
	);
}

function ActionsTextBanner({ actions }: { actions: React.ReactNode }) {
	return (
		<Banner
			tone="info"
			onDismiss={() => {
				console.log("Dismissed");
			}}
			actions={actions}
			message="This site uses cookies to improve your experience."
		/>
	);
}
