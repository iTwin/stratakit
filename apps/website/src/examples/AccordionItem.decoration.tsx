/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Icon } from "@stratakit/foundations";
import { unstable_AccordionItem as AccordionItem } from "@stratakit/structures";

import infoIcon from "@stratakit/icons/info.svg";

export default () => {
	return (
		<AccordionItem.Root>
			<AccordionItem.Header>
				<AccordionItem.Marker />
				<AccordionItem.Decoration render={<Icon href={infoIcon} />} />
				<AccordionItem.Button>
					<AccordionItem.Label>What is StrataKit?</AccordionItem.Label>
				</AccordionItem.Button>
			</AccordionItem.Header>
			<AccordionItem.Content>
				StrataKit is Bentley Systems' open source design system and the
				successor to iTwinUI.
			</AccordionItem.Content>
		</AccordionItem.Root>
	);
};
