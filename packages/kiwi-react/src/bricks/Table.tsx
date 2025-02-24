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

interface TableProps {
	children: React.ReactNode;
}

const TableContext = React.createContext<{
	captionId: string | undefined;
	setCaptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
	captionId: undefined,
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
 *   <Table.CustomTable> // Or, <Table.HtmlTable>
 *     <Table.Caption>Table Caption</Table.Caption>
 *
 *     <Table.Header>
 *   	   <Table.Row>
 *   	     <Table.Cell>Header 1</Table.Cell>
 *   	 	   <Table.Cell>Header 2</Table.Cell>
 *   	   </Table.Row>
 *     </Table.Header>
 *
 *     <Table.Body>
 *   	   <Table.Row>
 *   		   <Table.Cell>Cell 1.1</Table.Cell>
 *   		   <Table.Cell>Cell 1.2</Table.Cell>
 *   	   </Table.Row>
 *   	   <Table.Row>
 *   		   <Table.Cell>Cell 2.1</Table.Cell>
 *   		   <Table.Cell>Cell 2.2</Table.Cell>
 *   	   </Table.Row>
 *     </Table.Body>
 *   </Table.CustomTable> // Or, <Table.HtmlTable>
 * </Table.Root>
 * ```
 */
function Table(props: TableProps) {
	const { children } = props;
	const [captionId, setCaptionId] = React.useState<string | undefined>();

	const tableContext = React.useMemo(
		() => ({ captionId, setCaptionId }),
		[captionId],
	);

	return (
		<TableContext.Provider value={tableContext}>
			{children}
		</TableContext.Provider>
	);
}
DEV: Table.displayName = "Table.Root";

// ----------------------------------------------------------------------------

interface HtmlTableProps extends BaseProps {}
const TableModeContext = React.createContext<"custom" | "html">("custom");

/**
 * `Table.HtmlTable` is a table component that uses native HTML table elements.
 * E.g. `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>`.
 *
 * Related: `Table.CustomTable`
 */
const HtmlTable = forwardRef<"table", HtmlTableProps>((props, forwardedRef) => {
	const { className, ...rest } = props;

	return (
		<TableModeContext.Provider value="html">
			<Ariakit.Role
				ref={forwardedRef}
				render={<table />}
				{...rest}
				className={cx("🥝-table-header", className)}
			/>
		</TableModeContext.Provider>
	);
});
DEV: HtmlTable.displayName = "Table.HtmlTable";

// ----------------------------------------------------------------------------

interface CustomTableProps extends BaseProps {}

/**
 * `Table.CustomTable` is a table component that uses custom elements to create a table.
 * E.g. `<div role="table">`, `<div role="rowgroup">`, `<div role="row">`, `<div role="columnheader">`, and `<div role="cell">`.
 */
const CustomTable = forwardRef<"div", CustomTableProps>(
	(props, forwardedRef) => {
		const { className, ...rest } = props;

		const { captionId } = React.useContext(TableContext);

		return (
			<TableModeContext.Provider value="custom">
				<Ariakit.Role.div
					ref={forwardedRef}
					role="table"
					aria-labelledby={captionId}
					{...rest}
					className={cx("🥝-table", className)}
				/>
			</TableModeContext.Provider>
		);
	},
);
DEV: CustomTable.displayName = "Table.CustomTable";

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
const TableHeader = forwardRef<"div" | "thead", TableHeaderProps>(
	(props, forwardedRef) => {
		const { render: renderProp, className, ...rest } = props;
		const mode = React.useContext(TableModeContext);

		const Component = mode === "html" ? Ariakit.Role : Ariakit.Role.div;
		const defaultRender = mode === "html" ? <thead /> : undefined;

		return (
			<TableHeaderContext.Provider value={true}>
				<Component
					ref={forwardedRef}
					role={mode === "custom" ? "rowgroup" : undefined}
					{...rest}
					render={renderProp || defaultRender}
					className={cx("🥝-table-header", className)}
				/>
			</TableHeaderContext.Provider>
		);
	},
);
DEV: TableHeader.displayName = "Table.Header";

// ----------------------------------------------------------------------------

interface TableBodyProps extends BaseProps<"div" | "tbody"> {}

/**
 * `Table.Body` is a component that contains the rows of table data.
 * Multiple `Table.Row`s and `Table.Cell`s can be nested inside a `Table.Body` to create a table body.
 *
 *  This component intentionally does not set `role=rowgroup` because it is not properly supported.
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
const TableBody = forwardRef<"div" | "tbody", TableBodyProps>(
	(props, forwardedRef) => {
		const { render: renderProp, className, ...rest } = props;
		const mode = React.useContext(TableModeContext);

		const Component = mode === "html" ? Ariakit.Role : Ariakit.Role.div;
		const defaultRender = mode === "html" ? <tbody /> : undefined;

		return (
			<Component
				ref={forwardedRef}
				{...rest}
				render={renderProp || defaultRender}
				className={cx("🥝-table-body", className)}
			/>
		);
	},
);
DEV: TableBody.displayName = "Table.Body";

// ----------------------------------------------------------------------------

interface TableRowProps extends BaseProps<"div" | "tr"> {}

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
const TableRow = forwardRef<"div" | "tr", TableRowProps>(
	(props, forwardedRef) => {
		const { render: renderProp, className, ...rest } = props;
		const mode = React.useContext(TableModeContext);

		const Component = mode === "html" ? Ariakit.Role : Ariakit.Role.div;
		const defaultRender = mode === "html" ? <tr /> : undefined;

		return (
			<Component
				ref={forwardedRef}
				role={mode === "custom" ? "row" : undefined}
				{...rest}
				render={renderProp || defaultRender}
				className={cx("🥝-table-row", className)}
			/>
		);
	},
);
DEV: TableRow.displayName = "Table.Row";

// ----------------------------------------------------------------------------

interface TableCaptionProps extends BaseProps<"div" | "caption"> {}

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
const TableCaption = forwardRef<"div" | "caption", TableCaptionProps>(
	(props, forwardedRef) => {
		const fallbackId = React.useId();

		const {
			id = fallbackId,
			children,
			render: renderProp,
			className,
			...rest
		} = props;
		const { setCaptionId } = React.useContext(TableContext);
		const mode = React.useContext(TableModeContext);

		const Component = mode === "html" ? Ariakit.Role : Ariakit.Role.div;
		const defaultRender = mode === "html" ? <caption /> : undefined;

		const captionIdRef = React.useCallback(
			(element: HTMLElement | null) => {
				setCaptionId(element ? id : undefined);
			},
			[id, setCaptionId],
		);

		return (
			<Component
				render={renderProp || defaultRender}
				id={id}
				{...rest}
				className={cx("🥝-table-caption", className)}
				ref={useMergedRefs(forwardedRef, captionIdRef)}
			>
				{children}
			</Component>
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
const TableCell = forwardRef<"div" | "span", TableCellProps>(
	(props, forwardedRef) => {
		const isWithinTableHeader = React.useContext(TableHeaderContext);
		const mode = React.useContext(TableModeContext);
		const { className, render: renderProp, children, ...rest } = props;

		const role = React.useMemo(() => {
			if (mode === "custom") {
				return isWithinTableHeader ? "columnheader" : "cell";
			}

			return undefined;
		}, [mode, isWithinTableHeader]);

		const [Component, defaultRender] = React.useMemo(() => {
			if (mode === "custom") {
				return [Ariakit.Role.span, undefined];
			}

			return isWithinTableHeader
				? [Ariakit.Role, <th key={0} />]
				: [Ariakit.Role, <td key={0} />];
		}, [mode, isWithinTableHeader]);

		return (
			<Component
				ref={forwardedRef as React.Ref<HTMLDivElement>}
				role={role}
				{...rest}
				render={renderProp || defaultRender}
				className={cx("🥝-table-cell", className)}
			>
				{children}
			</Component>
		);
	},
);
DEV: TableCell.displayName = "Table.Cell";

// ----------------------------------------------------------------------------

export {
	Table as Root,
	HtmlTable,
	CustomTable,
	TableHeader as Header,
	TableBody as Body,
	TableRow as Row,
	TableCaption as Caption,
	TableCell as Cell,
};
