/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import * as React from "react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";
import { useMergedRefs } from "./~hooks.js";

// ----------------------------------------------------------------------------

interface TableProps extends BaseProps {}
const TableContext = React.createContext<{
	setCaptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
	setCaptionId: () => {},
});

/**
 * A table is a grid of rows and columns that displays data in a structured format.
 *
 * `Table.Root` is the root component for a table.
 * `Table.Header`, `Table.Body`, and `Table.Cell` can be nested inside a `Table.Root` to create a table structure.
 *
 * Example:
 * ```tsx
 * <Table.Root>
 *  <Table.Caption>Table Caption</Table.Caption>
 * 	<Table.Header>
 * 		<Table.Row>
 * 			<Table.Cell>Header 1</Table.Cell>
 * 			<Table.Cell>Header 2</Table.Cell>
 * 		</Table.Row>
 * 	</Table.Header>
 *
 * 	<Table.Body>
 * 		<Table.Row>
 * 			<Table.Cell>Cell 1.1</Table.Cell>
 * 			<Table.Cell>Cell 1.2</Table.Cell>
 * 		</Table.Row>
 * 		<Table.Row>
 * 			<Table.Cell>Cell 2.1</Table.Cell>
 * 			<Table.Cell>Cell 2.2</Table.Cell>
 * 		</Table.Row>
 * 	</Table.Body>
 * </Table.Root>
 * ```
 */
const Table = forwardRef<"div", TableProps>((props, forwardedRef) => {
	const [captionId, setCaptionId] = React.useState<string | undefined>();

	const tableContext = React.useMemo(() => ({ setCaptionId }), []);

	return (
		<TableContext.Provider value={tableContext}>
			<Ariakit.Role
				{...props}
				className={cx("🥝-table", props.className)}
				ref={forwardedRef}
				role="table"
				aria-labelledby={captionId}
			>
				{props.children}
			</Ariakit.Role>
		</TableContext.Provider>
	);
});
DEV: Table.displayName = "Table.Root";

// ----------------------------------------------------------------------------

interface TableHeaderProps extends BaseProps {}
const TableHeaderContext = React.createContext(false);

/**
 * `Table.Header` is a column component of cells that labels the columns of a table.
 * `Table.Row` and `Table.Cell` can be nested inside a `Table.Header` to create a header row.
 *
 * Example:
 * ```tsx
 *	<Table.Header>
 *		<Table.Row>
 *			<Table.Cell>Header 1</Table.Cell>
 * 			<Table.Cell>Header 2</Table.Cell>
 *		</Table.Row>
 *	</Table.Header>
 * ```
 */
const TableHeader = forwardRef<"div", TableHeaderProps>(
	(props, forwardedRef) => {
		return (
			<TableHeaderContext.Provider value={true}>
				<Ariakit.Role.div
					{...props}
					className={cx("🥝-table-header", props.className)}
					ref={forwardedRef}
					role="rowgroup"
				>
					{props.children}
				</Ariakit.Role.div>
			</TableHeaderContext.Provider>
		);
	},
);
DEV: TableHeader.displayName = "Table.Header";

// ----------------------------------------------------------------------------

interface TableBodyProps extends BaseProps {}

/**
 * `Table.Body` is a component that contains the rows of table data.
 * Multiple `Table.Row`s and `Table.Cell`s can be nested inside a `Table.Body` to create a table body.
 *
 * Example:
 * ```tsx
 *	<Table.Body>
 *		<Table.Row>
 *			<Table.Cell>Cell 1.1</Table.Cell>
 *			<Table.Cell>Cell 1.2</Table.Cell>
 *		</Table.Row>
 *		<Table.Row>
 *			<Table.Cell>Cell 2.1</Table.Cell>
 *			<Table.Cell>Cell 2.2</Table.Cell>
 *		</Table.Row>
 *	</Table.Body>
 * ```
 */
const TableBody = forwardRef<"div", TableBodyProps>((props, forwardedRef) => {
	return (
		<Ariakit.Role.div
			{...props}
			className={cx("🥝-table-body", props.className)}
			ref={forwardedRef}
			role="rowgroup"
		>
			{props.children}
		</Ariakit.Role.div>
	);
});
DEV: TableBody.displayName = "Table.Body";

// ----------------------------------------------------------------------------

interface TableRowProps extends BaseProps {}

/**
 * `Table.Row` is a component that contains the cells of a table row.
 *
 * Example:
 * ```tsx
 *	<Table.Row>
 *		<Table.Cell>Cell 1.1</Table.Cell>
 *		<Table.Cell>Cell 1.2</Table.Cell>
 *	</Table.Row>
 * ```
 */
const TableRow = forwardRef<"div", TableRowProps>((props, forwardedRef) => {
	const { children, ...rest } = props;

	return (
		<Ariakit.Role.div
			{...rest}
			className={cx("🥝-table-row", props.className)}
			ref={forwardedRef}
			role="row"
		>
			{children}
		</Ariakit.Role.div>
	);
});
DEV: TableRow.displayName = "Table.Row";

// ----------------------------------------------------------------------------

interface TableCaptionProps extends BaseProps<"caption"> {}

/**
 * `Table.Caption` is a component that contains the caption of a table.
 *
 * Example:
 * ```tsx
 * <Table.Root>
 * 	<Table.Caption>Table Caption</Table.Caption>
 * 	…
 * </Table.Root>
 * ```
 */
const TableCaption = forwardRef<"caption", TableCaptionProps>(
	(props, forwardedRef) => {
		const { id: idProp, children, ...rest } = props;
		const { setCaptionId } = React.useContext(TableContext);

		const fallbackId = React.useId();
		const id = idProp || fallbackId;

		const captionIdRef = React.useCallback(
			(element: HTMLElement | null) => {
				setCaptionId(element ? id : undefined);
			},
			[id, setCaptionId],
		);

		const ref = useMergedRefs(forwardedRef, captionIdRef);

		return (
			<Ariakit.Role
				{...rest}
				id={id}
				className={cx("🥝-table-caption", props.className)}
				ref={ref}
			>
				{children}
			</Ariakit.Role>
		);
	},
);
DEV: TableCaption.displayName = "Table.Caption";

// ----------------------------------------------------------------------------

interface TableCellProps extends BaseProps<"span"> {}

/**
 * `Table.Cell` is a component that contains the data of a table cell.
 *
 * Example:
 * ```tsx
 *	<Table.Cell>Cell 1.1</Table.Cell>
 * ```
 */
const TableCell = forwardRef<"span", TableCellProps>((props, forwardedRef) => {
	const isWithinTableHeader = React.useContext(TableHeaderContext);

	return (
		<Ariakit.Role.span
			{...props}
			className={cx("🥝-table-cell", props.className)}
			ref={forwardedRef}
			role={isWithinTableHeader ? "columnheader" : "cell"}
		>
			{props.children}
		</Ariakit.Role.span>
	);
});
DEV: TableCell.displayName = "Table.Cell";

// ----------------------------------------------------------------------------

export {
	Table as Root,
	TableHeader as Header,
	TableBody as Body,
	TableRow as Row,
	TableCaption as Caption,
	TableCell as Cell,
};
