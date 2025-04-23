/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor, Banner, Button, VisuallyHidden } from "@stratakit/bricks";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Banner" };

export default definePage(
	function Page() {
		return <Banner label="Label" message="Message" />;
	},
	{
		visual: VisualTest,
		dismiss: DismissibleTest,
		actions: ActionsTest,
		allStyleCases: AllStyleCases,
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
							onDismiss={() => {}}
							actions={<Button>Action</Button>}
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
				actions={<Button>Manage cookies</Button>}
				label={<VisuallyHidden>Privacy Notice</VisuallyHidden>}
				message="This site uses cookies to improve your experience."
			/>
			<Banner
				tone="info"
				onDismiss={() => {
					console.log("Dismissed");
				}}
				actions={<Anchor render={<button />}>Manage cookies</Anchor>}
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
						<Button>Manage cookies</Button>
						<Button>Don't show again</Button>
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
						<Anchor render={<button />}>Manage cookies</Anchor>
						<Anchor render={<button />}>Don't show again</Anchor>
					</>
				}
				label={<VisuallyHidden>Privacy Notice</VisuallyHidden>}
				message="This site uses cookies to improve your experience."
			/>
		</div>
	);
}

function AllStyleCases() {
	const labelPermutations = ["visual", "visually-hidden"];
	const actionPermutations = ["anchors", "buttons", "none"];
	const dismissPermutations = ["dismissable", "non-dismissable"];

	return (
		<div style={{ display: "grid", gap: 4 }}>
			{labelPermutations.map((labelPermutation) => {
				return actionPermutations.map((actionPermutation) => {
					return dismissPermutations.map((dismissPermutation) => {
						return (
							<Banner
								key={`${labelPermutation}-${actionPermutation}-${dismissPermutation}`}
								icon={placeholderIcon}
								variant="outline"
								tone="info"
								label={
									labelPermutation === "visual" ? (
										"This is a long label that goes on and on and on and on"
									) : (
										<VisuallyHidden>
											This is a long label that goes on and on and on and on
										</VisuallyHidden>
									)
								}
								// message="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
								// eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
								// enim ad minim veniam, quis nostrud exercitation ullamco laboris"
								message={`${JSON.stringify({ label: labelPermutation, action: actionPermutation, dismiss: dismissPermutation })}. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris`}
								onDismiss={
									dismissPermutation === "dismissable"
										? () => {
												console.log("Dismissed");
											}
										: undefined
								}
								actions={
									actionPermutation === "buttons" ? (
										<>
											<Button>Manage cookies</Button>
											<Button>Don't show again</Button>
										</>
									) : actionPermutation === "anchors" ? (
										<>
											<Anchor render={<button />}>Manage cookies</Anchor>
											<Anchor render={<button />}>Don't show again</Anchor>
										</>
									) : undefined
								}
							/>
						);
					});
				});
			})}
		</div>
	);
}
