/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Role } from "@ariakit/react/role";
import {
	forwardRef,
	useMergedRefs,
	useSafeContext,
} from "@stratakit/foundations/secret-internals";
import cx from "classnames";
import { useInit } from "./~utils.useInit.js";

import type { BaseProps } from "@stratakit/foundations/secret-internals";

// ----------------------------------------------------------------------------

const TableContext = React.createContext<
	| {
			captionId?: string;
			setCaptionId?: React.Dispatch<React.SetStateAction<string | undefined>>;
			mode: "aria" | "html";
	  }
	| undefined
>(undefined);

const TableHeaderContext = React.createContext(false);

// ----------------------------------------------------------------------------

interface HtmlTableProps extends BaseProps {}

/**
 * A table is a grid of rows and columns that displays data in a structured format.
 *
 * `Table.HtmlTable` uses native HTML table elements for the table root *and its descendants*.
 *
 * E.g. `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, and `<td>`.
 *
 * Related: `Table.CustomTable`
 *
 * Example:
 * ```tsx
 * <Table.HtmlTable> // <table>
 *   <Table.Caption>Table Caption</Table.Caption> // <caption>
 *
 *   <Table.Header> // <thead>
 * 	   <Table.Row> // <tr>
 * 	     <Table.Cell>Header 1</Table.Cell> // <th>
 * 	 	   <Table.Cell>Header 2</Table.Cell> // <th>
 * 	   </Table.Row>
 *   </Table.Header>
 *
 *   <Table.Body> // <tbody>
 * 	   <Table.Row> // <tr>
 * 		   <Table.Cell>Cell 1.1</Table.Cell> // <td>
 * 		   <Table.Cell>Cell 1.2</Table.Cell> // <td>
 * 	   </Table.Row>
 * 	   <Table.Row> // <tr>
 * 		   <Table.Cell>Cell 2.1</Table.Cell> // <td>
 * 		   <Table.Cell>Cell 2.2</Table.Cell> // <td>
 * 	   </Table.Row>
 *   </Table.Body>
 * </Table.HtmlTable>
 * ```
 */
const HtmlTable = forwardRef<"table", HtmlTableProps>((props, forwardedRef) => {
	useInit();

	const tableContextValue = React.useMemo(
		() => ({ mode: "html" as const }),
		[],
	);

	return (
		<TableContext.Provider value={tableContextValue}>
			<Role
				render={<table />}
				{...props}
				ref={forwardedRef}
				className={cx("🥝Table", props.className)}
			/>
		</TableContext.Provider>
	);
});
DEV: HtmlTable.displayName = "Table.HtmlTable";

// ----------------------------------------------------------------------------

interface CustomTableProps extends BaseProps {}

/**
 * A table is a grid of rows and columns that displays data in a structured format.
 *
 * `Table.CustomTable` implements the [WAI-ARIA table pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/) using
 * divs + appropriate roles for the table root *and its descendants*.
 *
 * E.g. `<div role="table">`, `<div role="row">`, `<div role="columnheader">`, and `<div role="cell">`.
 *
 * Related: `Table.HtmlTable`
 *
 * Example:
 * ```tsx
 * <Table.CustomTable> // <div role="table">
 *   <Table.Caption>Table Caption</Table.Caption> // <div role="caption">
 *
 *   <Table.Header> // <div role="rowgroup">
 * 	   <Table.Row> // <div role="row">
 * 	     <Table.Cell>Header 1</Table.Cell> // <div role="columnheader">
 * 	 	   <Table.Cell>Header 2</Table.Cell> // <div role="columnheader">
 * 	   </Table.Row>
 *   </Table.Header>
 *
 *   <Table.Body>
 * 	   <Table.Row> // <div role="row">
 * 		   <Table.Cell>Cell 1.1</Table.Cell> // <div role="cell">
 * 		   <Table.Cell>Cell 1.2</Table.Cell> // <div role="cell">
 * 	   </Table.Row>
 * 	   <Table.Row> // <div role="row">
 * 		   <Table.Cell>Cell 2.1</Table.Cell> // <div role="cell">
 * 		   <Table.Cell>Cell 2.2</Table.Cell> // <div role="cell">
 * 	   </Table.Row>
 *   </Table.Body>
 * </Table.CustomTable>
 * ```
 */
const CustomTable = forwardRef<"div", CustomTableProps>(
	(props, forwardedRef) => {
		useInit();

		// const { captionId } = useSafeContext(TableContext);
		const [captionId, setCaptionId] = React.useState<string | undefined>();

		const tableContextValue = React.useMemo(
			() => ({ captionId, setCaptionId, mode: "aria" as const }),
			[captionId],
		);

		return (
			<TableContext.Provider value={tableContextValue}>
				<Role.div
					role="table"
					aria-labelledby={captionId}
					{...props}
					ref={forwardedRef}
					className={cx("🥝Table", props.className)}
				/>
			</TableContext.Provider>
		);
	},
);
DEV: CustomTable.displayName = "Table.CustomTable";

// ----------------------------------------------------------------------------

interface TableHeaderProps extends BaseProps<"div"> {}

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
const TableHeader = forwardRef<"div", TableHeaderProps>(
	(props, forwardedRef) => {
		const { mode } = useSafeContext(TableContext);

		const render = mode === "html" ? <thead /> : undefined;
		const role = mode === "aria" ? "rowgroup" : undefined;

		return (
			<TableHeaderContext.Provider value={true}>
				<Role.div
					render={render}
					role={role}
					{...props}
					ref={forwardedRef}
					className={cx("🥝TableHeader", props.className)}
				/>
			</TableHeaderContext.Provider>
		);
	},
);
DEV: TableHeader.displayName = "Table.Header";

// ----------------------------------------------------------------------------

interface TableBodyProps extends BaseProps<"div"> {}

/**
 * `Table.Body` is a component that contains the rows of table data.
 * Multiple `Table.Row`s and `Table.Cell`s can be nested inside a `Table.Body` to create a table body.
 *
 * If within a `Table.HtmlTable`: it will render a `<tbody>` element.
 * If within a `Table.CustomTable`: it will render a `<div>` element.
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
	const { mode } = useSafeContext(TableContext);

	const render = mode === "html" ? <tbody /> : undefined;

	return (
		<Role.div
			render={render}
			role={undefined} // Intentionally not using "rowgroup" https://github.com/iTwin/stratakit/pull/243#discussion_r1947045668
			{...props}
			ref={forwardedRef}
			className={cx("🥝TableBody", props.className)}
		/>
	);
});
DEV: TableBody.displayName = "Table.Body";

// ----------------------------------------------------------------------------

interface TableRowProps extends BaseProps<"div"> {}

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
 *
 * Rows that contain checked checkboxes are considered selected.
 * The `Checkbox` component can be rendered to add selection functionality for the table rows.
 *
 * Example:
 * ```tsx
 * <Table.Row>
 *   <Table.Cell><Checkbox /><Table.Cell>
 *   <Table.Cell>Cell 1.1</Table.Cell>
 *   <Table.Cell>Cell 1.2</Table.Cell>
 * </Table.Row
 * ```
 */
const TableRow = forwardRef<"div", TableRowProps>((props, forwardedRef) => {
	const { mode } = useSafeContext(TableContext);

	const render = mode === "html" ? <tr /> : undefined;
	const role = mode === "aria" ? "row" : undefined;

	return (
		<Role.div
			render={render}
			role={role}
			{...props}
			ref={forwardedRef}
			className={cx("🥝TableRow", props.className)}
		/>
	);
});
DEV: TableRow.displayName = "Table.Row";

// ----------------------------------------------------------------------------

interface TableCaptionProps extends BaseProps<"div"> {}

/**
 * `Table.Caption` is a component that contains the caption of a table.
 *
 * If within a `Table.HtmlTable`: it will render a `<caption>` element.
 * If within a `Table.CustomTable`: it will render a `<div role="caption">` element.
 *
 * Example:
 * ```tsx
 * <Table.CustomTable> // Or <Table.HtmlTable>
 * 	 <Table.Caption>Table Caption</Table.Caption>
 * 	 …
 * </Table.CustomTable> // Or </Table.HtmlTable>
 * ```
 */
const TableCaption = forwardRef<"div", TableCaptionProps>(
	(props, forwardedRef) => {
		const fallbackId = React.useId();

		const { id = fallbackId, ...rest } = props;
		const { mode, setCaptionId } = useSafeContext(TableContext);

		const render = mode === "html" ? <caption /> : undefined;

		const captionIdRef = React.useCallback(
			(element: HTMLElement | null) => {
				setCaptionId?.(element ? id : undefined);
			},
			[id, setCaptionId],
		);

		return (
			<Role.div
				render={render}
				{...rest}
				id={id}
				ref={useMergedRefs(forwardedRef, captionIdRef)}
				className={cx("🥝TableCaption", props.className)}
			/>
		);
	},
);
DEV: TableCaption.displayName = "Table.Caption";

// ----------------------------------------------------------------------------

interface TableCellProps extends BaseProps<"div"> {}

/**
 * `Table.Cell` is a component that contains the data of a table cell.
 *
 * - If within a `Table.HtmlTable`: it will render a `<th>` element if also within a `Table.Header`, or a `<td>` element
 * if also within a `Table.Body`.
 * - If within a `Table.CustomTable`: it will render a `<div role="columnheader">` element if also within a
 * `Table.Header`, or a `<div role="cell">` element if also within a `Table.Body`.
 *
 * Example:
 * ```tsx
 *	<Table.Cell>Cell 1.1</Table.Cell>
 * ```
 */
const TableCell = forwardRef<"div", TableCellProps>((props, forwardedRef) => {
	const isWithinTableHeader = useSafeContext(TableHeaderContext);
	const { mode } = useSafeContext(TableContext);

	const { render, role } = React.useMemo(() => {
		if (mode === "aria") {
			return { role: isWithinTableHeader ? "columnheader" : "cell" };
		}
		return { render: isWithinTableHeader ? <th /> : <td /> };
	}, [isWithinTableHeader, mode]);

	return (
		<Role.div
			render={render}
			role={role}
			{...props}
			ref={forwardedRef}
			className={cx("🥝TableCell", props.className)}
		/>
	);
});
DEV: TableCell.displayName = "Table.Cell";

// ----------------------------------------------------------------------------

export {
	HtmlTable,
	CustomTable,
	TableHeader as Header,
	TableBody as Body,
	TableRow as Row,
	TableCaption as Caption,
	TableCell as Cell,
};
