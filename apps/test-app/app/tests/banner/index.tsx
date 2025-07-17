/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Anchor, Button, VisuallyHidden } from "@stratakit/bricks";
import { unstable_Banner as Banner } from "@stratakit/structures";
import {
	Actions as BannerActions,
	DismissButton as BannerDismiss,
	Icon as BannerIcon,
	Label as BannerLabel,
	Message as BannerMessage,
	Root as BannerRoot,
} from "@stratakit/structures/unstable_Banner";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "Banner" };

const loremIpsum =
	"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris";
const dummyLongLabel =
	"This is a long label that goes on and on and on and on and on and on and on and on and on and on";
const tones = ["neutral", "info", "positive", "attention", "critical"] as const;

export default definePage(
	function Page({ icon, tone }) {
		return (
			<Banner
				className="my-banner"
				label="Label"
				message="Message"
				icon={
					icon ? (
						<svg className="my-banner-custom-icon">
							<use href={placeholderIcon} />
						</svg>
					) : undefined
				}
				tone={tone as (typeof tones)[number]}
			/>
		);
	},
	{
		visual: VisualTest,
		dismiss: DismissibleTest,
		actions: ActionsTest,
		allStyleCases: AllStyleCases,
		composition: CompositionBasicTest,
	},
);

function VisualTest({ customIcons = false }: { customIcons?: boolean }) {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			{tones.map((tone) => {
				const sentenceCaseTone =
					tone.charAt(0).toUpperCase() + tone.slice(1).toLowerCase();
				return (
					<Banner
						data-testid={`banner-${tone}`}
						icon={customIcons ? placeholderIcon : undefined}
						label={sentenceCaseTone}
						message={loremIpsum}
						key={tone}
						tone={tone}
						variant="outline"
						onDismiss={() => {}}
						actions={<Button>Action</Button>}
					/>
				);
			})}

			<CompositionTestPermutations />
		</div>
	);
}

function DismissibleTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Banner
				className="my-banner"
				label="Label"
				message="Banner with visual label and with no dismiss button"
			/>
			<Banner
				className="my-banner"
				label="Label"
				message="Banner with visual label and with dismiss button"
				onDismiss={() => {}}
			/>
			<Banner
				className="my-banner"
				label={<VisuallyHidden>Label</VisuallyHidden>}
				message="Banner with visually hidden label and with dismiss button"
				onDismiss={() => {}}
			/>
		</div>
	);
}

function ActionsTest() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<Banner
				tone="info"
				onDismiss={() => {}}
				actions={<Button>Manage cookies</Button>}
				label={<VisuallyHidden>Privacy Notice</VisuallyHidden>}
				message="This site uses cookies to improve your experience."
			/>
			<Banner
				tone="info"
				onDismiss={() => {}}
				actions={<Anchor render={<button />}>Manage cookies</Anchor>}
				label={<VisuallyHidden>Privacy Notice</VisuallyHidden>}
				message="This site uses cookies to improve your experience."
			/>
			<Banner
				tone="info"
				onDismiss={() => {}}
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
				onDismiss={() => {}}
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
										dummyLongLabel
									) : (
										<VisuallyHidden>{dummyLongLabel}</VisuallyHidden>
									)
								}
								message={`${JSON.stringify({ label: labelPermutation, action: actionPermutation, dismiss: dismissPermutation })}. ${loremIpsum}`}
								onDismiss={
									dismissPermutation === "dismissable" ? () => {} : undefined
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

function CompositionBasicTest({
	icon,
	tone = "neutral",
}: Record<string, string>) {
	const shouldRenderIcon = icon === "true" || tone !== "neutral";

	return (
		<BannerRoot className="my-banner" tone={tone as (typeof tones)[number]}>
			{shouldRenderIcon ? (
				<BannerIcon
					render={
						<svg className="my-banner-custom-icon">
							<use href={placeholderIcon} />
						</svg>
					}
				/>
			) : null}
			<BannerLabel>Label</BannerLabel>
			<BannerMessage>
				This is a message that can be very long and will wrap to the next line.
			</BannerMessage>
			<BannerActions>
				<Button>Action</Button>
			</BannerActions>
		</BannerRoot>
	);
}

function CompositionTestPermutations() {
	return (
		<div style={{ display: "grid", gap: 4 }}>
			<BannerRoot
				tone="info"
				variant="outline"
				data-testid="banner-info-custom-icon"
			>
				<BannerIcon href={placeholderIcon} />
				<BannerLabel id="my-label">Label</BannerLabel>
				<BannerMessage>
					This is a message that can be very long and will wrap to the next
					line.
				</BannerMessage>
				<BannerActions>
					<Button>Action</Button>
				</BannerActions>
				<BannerDismiss onClick={() => console.log("Dismissed")} />
			</BannerRoot>

			<BannerRoot tone="info" data-testid="banner-info-no-custom-icon">
				<BannerIcon />
				<BannerLabel>Label</BannerLabel>
				<BannerMessage>Message</BannerMessage>
			</BannerRoot>

			<BannerRoot data-testid="banner-neutral-no-custom-icon">
				<BannerLabel>Label</BannerLabel>
				<BannerMessage>Message</BannerMessage>
			</BannerRoot>
		</div>
	);
}
