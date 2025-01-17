/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as Ariakit from "@ariakit/react";
import * as React from "react";
import cx from "classnames";
import { forwardRef, type BaseProps } from "./~utils.js";

// ----------------------------------------------------------------------------

interface TableProps extends BaseProps {}

const Table = forwardRef<"div", TableProps>((props, forwardedRef) => {
	return (
		<Ariakit.Role.div
			{...props}
			className={cx("🥝-table", props.className)}
			ref={forwardedRef}
		>
			{props.children}
		</Ariakit.Role.div>
	);
});
DEV: Table.displayName = "Table.Root";

// ----------------------------------------------------------------------------

interface TableHeaderProps extends BaseProps {}

const TableHeader = forwardRef<"div", TableHeaderProps>(
	(props, forwardedRef) => {
		return (
			<TableVariantContext.Provider value={{ variant: "header" }}>
				<Ariakit.Role.div
					{...props}
					className={cx("🥝-table-header", props.className)}
					ref={forwardedRef}
				>
					{props.children}
				</Ariakit.Role.div>
			</TableVariantContext.Provider>
		);
	},
);
DEV: TableHeader.displayName = "Table.Header";

// ----------------------------------------------------------------------------

interface TableBodyProps extends BaseProps {}

const TableBody = forwardRef<"div", TableBodyProps>((props, forwardedRef) => {
	return (
		<TableVariantContext.Provider value={{ variant: "body" }}>
			<Ariakit.Role.div
				{...props}
				className={cx("🥝-table-body", props.className)}
				ref={forwardedRef}
			>
				{props.children}
			</Ariakit.Role.div>
		</TableVariantContext.Provider>
	);
});
DEV: TableBody.displayName = "Table.Body";

// ----------------------------------------------------------------------------

interface TableRowProps extends BaseProps {
	/**
	 * Marks the row as selected.
	 *
	 * @default undefined
	 */
	selected?: boolean;
	/**
	 * Disables the row and prevents user interaction.
	 *
	 * @default undefined
	 */
	disabled?: boolean;
}

const TableRow = forwardRef<"div", TableRowProps>((props, forwardedRef) => {
	const { children, selected, disabled, ...rest } = props;
	const tableContext = React.useContext(TableVariantContext);

	return (
		<Ariakit.Role.div
			{...rest}
			className={cx("🥝-table-row", props.className)}
			ref={forwardedRef}
			aria-selected={selected}
			aria-disabled={disabled}
			data-kiwi-variant={
				tableContext?.variant === "header" ? "header" : undefined
			}
		>
			{children}
		</Ariakit.Role.div>
	);
});
DEV: TableRow.displayName = "Table.Row";

// ----------------------------------------------------------------------------

interface TableCellProps extends BaseProps {}

const TableCell = forwardRef<"span", TableCellProps>((props, forwardedRef) => {
	return (
		<Ariakit.Role.span
			{...props}
			className={cx("🥝-table-cell", props.className)}
			ref={forwardedRef}
		>
			{props.children}
		</Ariakit.Role.span>
	);
});
DEV: TableCell.displayName = "Table.Cell";

// ----------------------------------------------------------------------------

const TableVariantContext = React.createContext<
	| {
			variant?: "header" | "body";
	  }
	| undefined
>(undefined);

// ----------------------------------------------------------------------------

export {
	Table as Root,
	TableHeader as Header,
	TableBody as Body,
	TableRow as Row,
	TableCell as Cell,
};
