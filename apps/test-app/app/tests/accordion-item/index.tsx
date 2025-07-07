/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Icon } from "@stratakit/foundations";
import { unstable_AccordionItem as AccordionItem } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export default definePage(
	function Page({
		label = "Label",
		content = "Body",
		withDecoration,
		defaultOpen: defaultOpenProp,
	}) {
		const defaultOpen = Boolean(defaultOpenProp);
		return (
			<AccordionItem.Root defaultOpen={defaultOpen}>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					{withDecoration ? (
						<AccordionItem.Decoration
							render={<Icon href={placeholderIcon} />}
						/>
					) : null}
					<AccordionItem.Button data-testid="button">
						<AccordionItem.Label>{label}</AccordionItem.Label>
					</AccordionItem.Button>
				</AccordionItem.Header>
				<AccordionItem.Content data-testid="content">
					{content}
				</AccordionItem.Content>
			</AccordionItem.Root>
		);
	},
	{
		visual: VisualTest,
		heading: HeadingTest,
	},
);

export function HeadingTest() {
	return (
		<AccordionItem.Root>
			<AccordionItem.Header>
				<AccordionItem.Heading render={<h2 />}>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
				</AccordionItem.Heading>
				<AccordionItem.Marker />
			</AccordionItem.Header>
			<AccordionItem.Content>Body</AccordionItem.Content>
		</AccordionItem.Root>
	);
}

export function VisualTest() {
	return (
		<>
			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Marker />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Marker />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Marker />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Marker />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
					<AccordionItem.Marker />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
					<AccordionItem.Marker />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Decoration>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</AccordionItem.Decoration>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Decoration>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</AccordionItem.Decoration>
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Decoration>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</AccordionItem.Decoration>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Decoration>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</AccordionItem.Decoration>
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Decoration>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</AccordionItem.Decoration>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Decoration>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</AccordionItem.Decoration>
					<AccordionItem.Marker />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root defaultOpen>
				<AccordionItem.Header>
					<AccordionItem.Decoration>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</AccordionItem.Decoration>
					<AccordionItem.Button>
						<AccordionItem.Label>Label</AccordionItem.Label>
					</AccordionItem.Button>
					<AccordionItem.Decoration>
						<Icon href={placeholderIcon} />
						<Icon href={placeholderIcon} />
					</AccordionItem.Decoration>
					<AccordionItem.Marker />
				</AccordionItem.Header>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>
		</>
	);
}
