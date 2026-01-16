import { unstable_AccordionItem as AccordionItem } from "@stratakit/structures";

export default () => {
	return (
		<AccordionItem.Root defaultOpen>
			<AccordionItem.Header>
				<AccordionItem.Marker />
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
