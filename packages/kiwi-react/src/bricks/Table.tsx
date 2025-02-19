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

interface TableProps extends BaseProps<"div" | "table"> {
	// TODO: Confirm name of prop
	as?: "div" | "table";
}

const TableContext = React.createContext<{
	setCaptionId: React.Dispatch<React.SetStateAction<string | undefined>>;
	as: "div" | "table";
}>({
	setCaptionId: () => {},
	as: "div",
});

/**
 * A table is a grid of rows and columns that displays data in a structured format.
 *
 * `Table.Root` is the root component for a table.
 * `Table.Header`, `Table.Body`, and `Table.Cell` can be nested inside a `Table.Root` to create a table structure.
 *
 * Example:
 * ```tsx
 * <Table.Root as="table">
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
const Table = forwardRef<"div" | "table", TableProps>((props, forwardedRef) => {
	const {
		as = "div",
		render: renderProp,
		className,
		children,
		...rest
	} = props;
	const [captionId, setCaptionId] = React.useState<string | undefined>();

	const tableContext = React.useMemo(() => ({ setCaptionId, as }), [as]);

	const Component = as === "table" ? Ariakit.Role : Ariakit.Role.div;
	const defaultRender = as === "table" ? <table /> : undefined;

	return (
		<TableContext.Provider value={tableContext}>
			<Component
				ref={forwardedRef}
				role={as === "div" ? "table" : undefined}
				aria-labelledby={captionId}
				{...rest}
				render={renderProp || defaultRender}
				className={cx("🥝-table", className)}
			>
				{children}
			</Component>
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
const TableHeader = forwardRef<"div" | "thead", TableHeaderProps>(
	(props, forwardedRef) => {
		const { render: renderProp, ...rest } = props;
		const { as } = React.useContext(TableContext);

		const Component = as === "table" ? Ariakit.Role : Ariakit.Role.div;
		const defaultRender = as === "table" ? <thead /> : undefined;

		return (
			<TableHeaderContext.Provider value={true}>
				<Component
					ref={forwardedRef}
					role={as === "div" ? "rowgroup" : undefined}
					render={renderProp || defaultRender}
					{...rest}
					className={cx("🥝-table-header", props.className)}
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
		const { render: renderProp, ...rest } = props;
		const { as } = React.useContext(TableContext);

		const Component = as === "table" ? Ariakit.Role : Ariakit.Role.div;
		const defaultRender = as === "table" ? <tbody /> : undefined;

		return (
			<Component
				ref={forwardedRef}
				render={renderProp || defaultRender}
				{...rest}
				className={cx("🥝-table-body", props.className)}
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
		const { render: renderProp, ...rest } = props;
		const { as } = React.useContext(TableContext);

		const Component = as === "table" ? Ariakit.Role : Ariakit.Role.div;
		const defaultRender = as === "table" ? <tr /> : undefined;

		return (
			<Component
				render={renderProp || defaultRender}
				ref={forwardedRef}
				role={as === "div" ? "row" : undefined}
				{...rest}
				className={cx("🥝-table-row", props.className)}
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

		const { id = fallbackId, children, render: renderProp, ...rest } = props;
		const { setCaptionId, as } = React.useContext(TableContext);

		const Component = as === "table" ? Ariakit.Role : Ariakit.Role.div;
		const defaultRender = as === "table" ? <caption /> : undefined;

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
				className={cx("🥝-table-caption", props.className)}
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
		const { as } = React.useContext(TableContext);
		const { className, render: renderProp, ...rest } = props;

		const role = React.useMemo(() => {
			if (as === "div") {
				return isWithinTableHeader ? "columnheader" : "cell";
			}

			return undefined;
		}, [as, isWithinTableHeader]);

		const [Component, defaultRender] = React.useMemo(() => {
			if (as === "div") {
				return [Ariakit.Role.span, undefined];
			}

			return isWithinTableHeader
				? [Ariakit.Role, <th key={0} />]
				: [Ariakit.Role, <td key={0} />];
		}, [as, isWithinTableHeader]);

		return (
			<Component
				render={renderProp || defaultRender}
				ref={forwardedRef as React.Ref<HTMLDivElement>}
				role={role}
				{...rest}
				className={cx("🥝-table-cell", className)}
			>
				{props.children}
			</Component>
		);
	},
);
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
