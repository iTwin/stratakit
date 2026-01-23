/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { unstable_AccordionItem as AccordionItem } from "@stratakit/structures";

export default () => {
	return (
		<AccordionItem.Root>
			<AccordionItem.Header>
				<AccordionItem.Button>
					<AccordionItem.Label>What is StrataKit?</AccordionItem.Label>
				</AccordionItem.Button>
				<AccordionItem.Marker />
			</AccordionItem.Header>
			<AccordionItem.Content>
				StrataKit is Bentley Systems' open source design system and the
				successor to iTwinUI.
			</AccordionItem.Content>
		</AccordionItem.Root>
	);
};
