/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import * as React from "react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";
import { useMergedRefs, useSafeContext } from "./~hooks.js";

// ----------------------------------------------------------------------------

const TableContext = React.createContext<
	| {
			captionId: string | undefined;
			setCaptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
	  }
	| undefined
>(undefined);

const TableModeContext = React.createContext<"aria" | "html">("aria");

const TableHeaderContext = React.createContext(false);

// ----------------------------------------------------------------------------

interface TableProps {
	children: React.ReactNode;
}

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

/**
 * `Table.HtmlTable` uses native HTML table elements for the table root *and its descendants*.
 *
 * E.g. `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>`.
 *
 * Related: `Table.CustomTable`
 *
 * Example:
 * ```tsx
 * <Table.Root>
 *   <Table.HtmlTable> // <table>
 *     <Table.Caption>Table Caption</Table.Caption> // <caption>
 *
 *     <Table.Header> // <thead>
 *   	   <Table.Row> // <tr>
 *   	     <Table.Cell>Header 1</Table.Cell> // <th>
 *   	 	   <Table.Cell>Header 2</Table.Cell> // <th>
 *   	   </Table.Row>
 *     </Table.Header>
 *
 *     <Table.Body> // <tbody>
 *   	   <Table.Row> // <tr>
 *   		   <Table.Cell>Cell 1.1</Table.Cell> // <td>
 *   		   <Table.Cell>Cell 1.2</Table.Cell> // <td>
 *   	   </Table.Row>
 *   	   <Table.Row> // <tr>
 *   		   <Table.Cell>Cell 2.1</Table.Cell> // <td>
 *   		   <Table.Cell>Cell 2.2</Table.Cell> // <td>
 *   	   </Table.Row>
 *     </Table.Body>
 *   </Table.HtmlTable>
 * </Table.Root>
 * ```
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
 * `Table.CustomTable` implements the [WAI-ARIA table pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/) using
 * divs or spans + appropriate roles for the table root *and its descendants*.
 *
 * E.g. `<div role="table">`, `<div role="rowgroup">`, `<div role="row">`, `<span role="columnheader">`,
 * and `<span role="cell">`.
 *
 * Related: `Table.HtmlTable`
 *
 * Example:
 * ```tsx
 * <Table.Root>
 *   <Table.CustomTable> // <div role="table">
 *     <Table.Caption>Table Caption</Table.Caption> // <div role="caption">
 *
 *     <Table.Header> // <div role="rowgroup">
 *   	   <Table.Row> // <div role="row">
 *   	     <Table.Cell>Header 1</Table.Cell> // <span role="columnheader">
 *   	 	   <Table.Cell>Header 2</Table.Cell> // <span role="columnheader">
 *   	   </Table.Row>
 *     </Table.Header>
 *
 *     <Table.Body> // <div role="rowgroup">
 *   	   <Table.Row> // <div role="row">
 *   		   <Table.Cell>Cell 1.1</Table.Cell> // <span role="cell">
 *   		   <Table.Cell>Cell 1.2</Table.Cell> // <span role="cell">
 *   	   </Table.Row>
 *   	   <Table.Row> // <div role="row">
 *   		   <Table.Cell>Cell 2.1</Table.Cell> // <span role="cell">
 *   		   <Table.Cell>Cell 2.2</Table.Cell> // <span role="cell">
 *   	   </Table.Row>
 *     </Table.Body>
 *   </Table.CustomTable>
 * </Table.Root>
 * ```
 */
const CustomTable = forwardRef<"div", CustomTableProps>(
	(props, forwardedRef) => {
		const { className, ...rest } = props;

		const { captionId } = useSafeContext(TableContext);

		return (
			<TableModeContext.Provider value="aria">
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

interface TableHeaderProps extends BaseProps<"div" | "thead"> {}

/**
 * `Table.Header` is a column component of cells that labels the columns of a table.
 * `Table.Row` and `Table.Cell` can be nested inside a `Table.Header` to create a header row.
 *
 * If within a `Table.HtmlTable`: it will render a `<thead>` element.
 * If within a `Table.CustomTable`: it will render a `<div role="rowgroup">` element.
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
		const { className, ...rest } = props;
		const mode = useSafeContext(TableModeContext);

		const render = mode === "html" ? <thead /> : undefined;
		const role = mode === "html" ? undefined : "rowgroup";

		return (
			<TableHeaderContext.Provider value={true}>
				<Ariakit.Role.div
					ref={forwardedRef}
					render={render}
					role={role}
					{...rest}
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
 * If within a `Table.HtmlTable`: it will render a `<tbody>` element.
 * If within a `Table.CustomTable`: it will render a `<div role="rowgroup">` element.
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
		const { className, ...rest } = props;
		const mode = useSafeContext(TableModeContext);

		const render = mode === "html" ? <tbody /> : undefined;
		const role = mode === "html" ? undefined : "rowgroup";

		return (
			<Ariakit.Role.div
				ref={forwardedRef}
				render={render}
				role={role}
				{...rest}
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
 * If within a `Table.HtmlTable`: it will render a `<tr>` element.
 * If within a `Table.CustomTable`: it will render a `<div role="row">` element.
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
		const { className, ...rest } = props;
		const mode = useSafeContext(TableModeContext);

		const render = mode === "html" ? <tr /> : undefined;
		const role = mode === "html" ? undefined : "row";

		return (
			<Ariakit.Role.div
				ref={forwardedRef}
				render={render}
				role={role}
				{...rest}
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
 * If within a `Table.HtmlTable`: it will render a `<caption>` element.
 * If within a `Table.CustomTable`: it will render a `<div role="caption">` element.
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

		const { id = fallbackId, children, className, ...rest } = props;
		const { setCaptionId } = useSafeContext(TableContext);
		const mode = useSafeContext(TableModeContext);

		const render = mode === "html" ? <caption /> : undefined;
		const role = mode === "html" ? undefined : "caption";

		const captionIdRef = React.useCallback(
			(element: HTMLElement | null) => {
				setCaptionId(element ? id : undefined);
			},
			[id, setCaptionId],
		);

		return (
			<Ariakit.Role.div
				id={id}
				ref={useMergedRefs(forwardedRef, captionIdRef)}
				render={render}
				role={role}
				{...rest}
				className={cx("🥝-table-caption", className)}
			>
				{children}
			</Ariakit.Role.div>
		);
	},
);
DEV: TableCaption.displayName = "Table.Caption";

// ----------------------------------------------------------------------------

interface TableCellProps extends BaseProps<"span"> {}

/**
 * `Table.Cell` is a component that contains the data of a table cell.
 *
 * - If within a `Table.HtmlTable`: it will render a `<th>` element if also within a `Table.Header`, or a `<td>` element
 * if also within a `Table.Body`.
 * - If within a `Table.CustomTable`: it will render a `<span role="columnheader">` element if also within a
 * `Table.Header`, or a `<span role="cell">` element if also within a `Table.Body`.
 *
 * Example:
 * ```tsx
 *	<Table.Cell>Cell 1.1</Table.Cell>
 * ```
 */
const TableCell = forwardRef<"span", TableCellProps>((props, forwardedRef) => {
	const isWithinTableHeader = useSafeContext(TableHeaderContext);
	const mode = useSafeContext(TableModeContext);
	const { className, children, ...rest } = props;

	const [render, role] = React.useMemo(() => {
		if (mode === "aria") {
			return [undefined, isWithinTableHeader ? "columnheader" : "cell"];
		}

		return [isWithinTableHeader ? <th key={0} /> : <td key={0} />, undefined];
	}, [isWithinTableHeader, mode]);

	return (
		<Ariakit.Role.span
			ref={forwardedRef as React.Ref<HTMLDivElement>}
			render={render}
			role={role}
			{...rest}
			className={cx("🥝-table-cell", className)}
		>
			{children}
		</Ariakit.Role.span>
	);
});
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
