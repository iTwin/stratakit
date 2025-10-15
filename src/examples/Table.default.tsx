import { Table } from "@stratakit/structures";

export default () => {
	return (
		<Table.CustomTable>
			<Table.Caption>Coding languages and their acronyms.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Cell>Language</Table.Cell>
					<Table.Cell>Acronym</Table.Cell>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row>
					<Table.Cell>Cascading Style Sheets</Table.Cell>
					<Table.Cell>CSS</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>JavaScript</Table.Cell>
					<Table.Cell>JS</Table.Cell>
				</Table.Row>
				<Table.Row>
					<Table.Cell>HyperText Markup Language</Table.Cell>
					<Table.Cell>HTML</Table.Cell>
				</Table.Row>
			</Table.Body>
		</Table.CustomTable>
	);
};
