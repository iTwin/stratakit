/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Box from "@mui/material/Box";
import {
	DataGrid,
	type GridColDef,
	type GridRenderCellParams,
} from "@mui/x-data-grid";

import style from "./DataGrid.datatypes.module.css";

interface Asset {
	assetId: number;
	assetName: string;
	department: string;
	purchaseDate: string;
	cost: number;
	inService: boolean;
	tagColor: string;
}

const rows: Asset[] = [
	{
		assetId: 1001,
		assetName: "Dell Precision 7680",
		department: "Engineering",
		purchaseDate: "2024-03-15",
		cost: 2899,
		inService: true,
		tagColor: "#2E7D32",
	},
	{
		assetId: 1002,
		assetName: 'LG UltraFine 32" Monitor',
		department: "Engineering",
		purchaseDate: "2024-04-02",
		cost: 899,
		inService: true,
		tagColor: "#1976D2",
	},
	{
		assetId: 1003,
		assetName: "Microsoft Surface Laptop 7",
		department: "Finance",
		purchaseDate: "2025-01-10",
		cost: 1599,
		inService: true,
		tagColor: "#1976D2",
	},
	{
		assetId: 1004,
		assetName: "HP Color LaserJet Pro",
		department: "Operations",
		purchaseDate: "2022-06-21",
		cost: 749,
		inService: true,
		tagColor: "#ED6C02",
	},
	{
		assetId: 1005,
		assetName: "DJI Matrice 350 RTK",
		department: "Surveying",
		purchaseDate: "2025-02-18",
		cost: 12499,
		inService: true,
		tagColor: "#2E7D32",
	},
	{
		assetId: 1006,
		assetName: "Trimble X7 3D Scanner",
		department: "Surveying",
		purchaseDate: "2023-09-07",
		cost: 18950,
		inService: true,
		tagColor: "#9C27B0",
	},
	{
		assetId: 1007,
		assetName: 'Apple iPad Pro 13"',
		department: "Operations",
		purchaseDate: "2025-05-14",
		cost: 1299,
		inService: true,
		tagColor: "#1976D2",
	},
	{
		assetId: 1008,
		assetName: "Lenovo ThinkPad P16",
		department: "Engineering",
		purchaseDate: "2023-11-29",
		cost: 2549,
		inService: true,
		tagColor: "#2E7D32",
	},
	{
		assetId: 1009,
		assetName: "Brother ADS-4900W Scanner",
		department: "Finance",
		purchaseDate: "2022-10-12",
		cost: 649,
		inService: true,
		tagColor: "#ED6C02",
	},
	{
		assetId: 1010,
		assetName: "Poly Studio X50",
		department: "IT",
		purchaseDate: "2024-07-01",
		cost: 3199,
		inService: true,
		tagColor: "#1976D2",
	},
	{
		assetId: 1011,
		assetName: "Cisco Catalyst 9300 Switch",
		department: "IT",
		purchaseDate: "2023-05-24",
		cost: 4599,
		inService: true,
		tagColor: "#2E7D32",
	},
	{
		assetId: 1012,
		assetName: "Dell PowerEdge R760",
		department: "IT",
		purchaseDate: "2025-03-21",
		cost: 8749,
		inService: true,
		tagColor: "#9C27B0",
	},
	{
		assetId: 1013,
		assetName: "Logitech Rally Bar",
		department: "HR",
		purchaseDate: "2024-01-17",
		cost: 3499,
		inService: true,
		tagColor: "#1976D2",
	},
	{
		assetId: 1014,
		assetName: "Canon imageRUNNER DX",
		department: "Operations",
		purchaseDate: "2021-08-30",
		cost: 5299,
		inService: false,
		tagColor: "#D32F2F",
	},
	{
		assetId: 1015,
		assetName: "Microsoft Surface Hub 3",
		department: "Executive",
		purchaseDate: "2025-04-08",
		cost: 10999,
		inService: true,
		tagColor: "#9C27B0",
	},
	{
		assetId: 1016,
		assetName: "Epson SureColor T3770",
		department: "Surveying",
		purchaseDate: "2022-12-15",
		cost: 4499,
		inService: false,
		tagColor: "#616161",
	},
	{
		assetId: 1017,
		assetName: "Samsung Galaxy Tab S10 Ultra",
		department: "Field Services",
		purchaseDate: "2025-06-03",
		cost: 1399,
		inService: true,
		tagColor: "#1976D2",
	},
	{
		assetId: 1018,
		assetName: "Dell Latitude 7450",
		department: "HR",
		purchaseDate: "2024-09-11",
		cost: 1799,
		inService: true,
		tagColor: "#2E7D32",
	},
	{
		assetId: 1019,
		assetName: "Ricoh IM C4510",
		department: "Finance",
		purchaseDate: "2023-02-27",
		cost: 6899,
		inService: true,
		tagColor: "#ED6C02",
	},
	{
		assetId: 1020,
		assetName: "Leica BLK360 Scanner",
		department: "Surveying",
		purchaseDate: "2024-11-05",
		cost: 24990,
		inService: true,
		tagColor: "#9C27B0",
	},
];

function Swatch({ color = "transparent" }: { color?: string }) {
	return (
		<Box
			sx={{
				backgroundColor: color,
				height: "16px",
				width: "16px",
				borderWidth: "1px",
				borderStyle: "solid",
				borderColor: `contrast-color(var(${color}))`,
				borderRadius: "var(--stratakit-radius-sm)",
			}}
		/>
	);
}

const costFormatter = new Intl.NumberFormat("en", {
	style: "currency",
	currency: "USD",
	minimumFractionDigits: 0,
});

const columns: GridColDef<Asset>[] = [
	{ field: "assetId", headerName: "ID", width: 90, editable: false },
	{
		field: "assetName",
		headerName: "Name",
		width: 150,
		editable: true,
	},
	{
		field: "department",
		headerName: "Department",
		width: 150,
		type: "singleSelect",
		editable: true,
		valueOptions: [
			"Engineering",
			"Executive",
			"Field Services",
			"Finance",
			"HR",
			"IT",
			"Operations",
			"Surveying",
		],
	},
	{
		field: "purchaseDate",
		headerName: "Purchase  Date",
		type: "date",
		width: 110,
		editable: true,
		valueGetter: (_value, row) => new Date(row.purchaseDate),
	},
	{
		field: "cost",
		headerName: "Cost",
		align: "right",
		editable: true,
		valueFormatter: (value?: number) =>
			typeof value === "number" ? costFormatter.format(value) : "-",
	},
	{
		field: "inService",
		headerName: "In Service?",
		type: "boolean",
		editable: true,
	},
	{
		field: "tagColor",
		headerName: "Tag Color",
		type: "custom",
		cellClassName: style.color,
		renderCell: (params: GridRenderCellParams<Asset, string>) => (
			<Swatch color={params.value} />
		),
		editable: true,
	},
];

export default function DataTypesExample() {
	return (
		<DataGrid
			showToolbar
			rows={rows}
			columns={columns}
			getRowId={(row) => row.assetId}
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 10,
					},
				},
			}}
			pageSizeOptions={[5]}
			checkboxSelection
			disableRowSelectionOnClick
		/>
	);
}
