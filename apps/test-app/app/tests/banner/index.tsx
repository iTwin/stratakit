/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { definePage } from "~/~utils.tsx";
import {
	Anchor,
	Banner,
	Button,
	VisuallyHidden,
} from "@itwin/itwinui-react/bricks";
import placeholderIcon from "@itwin/itwinui-icons/placeholder.svg";

export const handle = { title: "Banner" };

export default definePage(
	function Page() {
		return <Banner label="Label" message="Message" />;
	},
	{
		visual: VisualTest,
		dismiss: DismissibleTest,
		actions: ActionsTest,
	},
);

function VisualTest({ customIcons = false }: { customIcons?: boolean }) {
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
							icon={customIcons ? placeholderIcon : undefined}
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

function DismissibleTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Banner
				label="Label"
				message="Banner with visual label and with no dismiss button"
			/>
			<Banner
				label={"Label"}
				message="Banner with visual label and with dismiss button"
				onDismiss={() => {
					console.log("Dismissed");
				}}
			/>
			<Banner
				label={<VisuallyHidden>Label</VisuallyHidden>}
				message="Banner with visually hidden label and with dismiss button"
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
			<Banner
				tone="info"
				onDismiss={() => {
					console.log("Dismissed");
				}}
				actions={<Button key="1">Manage cookies</Button>}
				label={<VisuallyHidden>Privacy Notice</VisuallyHidden>}
				message="This site uses cookies to improve your experience."
			/>
			<Banner
				tone="info"
				onDismiss={() => {
					console.log("Dismissed");
				}}
				actions={
					<Anchor key="1" render={<button />}>
						Manage cookies
					</Anchor>
				}
				label={<VisuallyHidden>Privacy Notice</VisuallyHidden>}
				message="This site uses cookies to improve your experience."
			/>
			<Banner
				tone="info"
				onDismiss={() => {
					console.log("Dismissed");
				}}
				actions={
					<>
						<Button key="1">Manage cookies</Button>
						<Button key="2">Don't show again</Button>
					</>
				}
				label={<VisuallyHidden>Privacy Notice</VisuallyHidden>}
				message="This site uses cookies to improve your experience."
			/>
			<Banner
				tone="info"
				onDismiss={() => {
					console.log("Dismissed");
				}}
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
				label={<VisuallyHidden>Privacy Notice</VisuallyHidden>}
				message="This site uses cookies to improve your experience."
			/>
		</div>
	);
}
