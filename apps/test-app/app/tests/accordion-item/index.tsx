/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { unstable_AccordionItem as AccordionItem } from "@stratakit/bricks";
import { Icon } from "@stratakit/foundations";
import placeholderIcon from "@stratakit/icons/placeholder.svg";
import { definePage } from "~/~utils.tsx";

export default definePage(
	function Page({
		label = "Label",
		content = "Body",
		withDecoration,
		defaultOpen: defaultOpenProp,
	}) {
		const defaultOpen = Boolean(defaultOpenProp);
		return (
			<>
				<AccordionItem.Root defaultOpen={defaultOpen}>
					<AccordionItem.Trigger data-testid="trigger">
						{withDecoration ? (
							<AccordionItem.Decoration
								render={<Icon href={placeholderIcon} />}
							/>
						) : null}
						<AccordionItem.Label>{label}</AccordionItem.Label>
						<AccordionItem.Marker />
					</AccordionItem.Trigger>
					<AccordionItem.Content data-testid="content">
						{content}
					</AccordionItem.Content>
				</AccordionItem.Root>
			</>
		);
	},
	{
		visual: VisualTest,
	},
);

export function VisualTest() {
	return (
		<>
			<AccordionItem.Root>
				<AccordionItem.Trigger>
					<AccordionItem.Label>Label</AccordionItem.Label>
					<AccordionItem.Marker />
				</AccordionItem.Trigger>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>
			<AccordionItem.Root defaultOpen>
				<AccordionItem.Trigger>
					<AccordionItem.Label>Label</AccordionItem.Label>
					<AccordionItem.Marker />
				</AccordionItem.Trigger>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>
			<AccordionItem.Root>
				<AccordionItem.Trigger>
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
					<AccordionItem.Label>Label</AccordionItem.Label>
					<AccordionItem.Marker />
				</AccordionItem.Trigger>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>
			<AccordionItem.Root defaultOpen>
				<AccordionItem.Trigger>
					<AccordionItem.Decoration render={<Icon href={placeholderIcon} />} />
					<AccordionItem.Label>Label</AccordionItem.Label>
					<AccordionItem.Marker />
				</AccordionItem.Trigger>
				<AccordionItem.Content>Body</AccordionItem.Content>
			</AccordionItem.Root>
		</>
	);
}
