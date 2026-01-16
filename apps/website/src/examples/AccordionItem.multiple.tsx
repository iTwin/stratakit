/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Anchor } from "@stratakit/bricks";
import { unstable_AccordionItem as AccordionItem } from "@stratakit/structures";

export default () => {
	return (
		<>
			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Heading render={<h2 />}>
						<AccordionItem.Button>
							<AccordionItem.Label>What is StrataKit?</AccordionItem.Label>
						</AccordionItem.Button>
					</AccordionItem.Heading>
				</AccordionItem.Header>
				<AccordionItem.Content>
					StrataKit is Bentley Systems' open source design system and the
					successor to iTwinUI.
				</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Heading render={<h2 />}>
						<AccordionItem.Button>
							<AccordionItem.Label>
								What is a design system?
							</AccordionItem.Label>
						</AccordionItem.Button>
					</AccordionItem.Heading>
				</AccordionItem.Header>
				<AccordionItem.Content>
					A design system is a comprehensive framework of standards, reusable
					components, and documentation that guides the consistent development
					of digital products.
				</AccordionItem.Content>
			</AccordionItem.Root>

			<AccordionItem.Root>
				<AccordionItem.Header>
					<AccordionItem.Marker />
					<AccordionItem.Heading render={<h2 />}>
						<AccordionItem.Button>
							<AccordionItem.Label>What is design?</AccordionItem.Label>
						</AccordionItem.Button>
					</AccordionItem.Heading>
				</AccordionItem.Header>
				<AccordionItem.Content>
					“Design is when designers design a design to produce a design.” —{" "}
					<Anchor href="https://academic.oup.com/book/790">
						<cite>Design: A Very Short Introduction</cite>
					</Anchor>
				</AccordionItem.Content>
			</AccordionItem.Root>
		</>
	);
};
