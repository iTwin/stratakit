/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon } from "@stratakit/mui";

import svgDocument from "@stratakit/icons/document.svg";
import svgUpload from "@stratakit/icons/upload.svg";
import styles from "./FileUpload.card.module.css";

const uploadedFile = {
	name: "structural-model.dgn",
	size: 2_621_440,
};

const states = [
	{ label: "Empty", file: undefined, isDragActive: false },
	{ label: "Empty, drag active", file: undefined, isDragActive: true },
	{ label: "File selected", file: uploadedFile, isDragActive: false },
	{
		label: "File selected, drag active",
		file: uploadedFile,
		isDragActive: true,
	},
];

export default () => {
	return (
		<Stack spacing={3} className={styles.states}>
			{states.map(({ label, file, isDragActive }) => (
				<Stack spacing={1} key={label}>
					<Typography variant="caption">{label}</Typography>
					<FileUploadState file={file} isDragActive={isDragActive} />
				</Stack>
			))}
		</Stack>
	);
};

interface FileUploadStateProps {
	file?: typeof uploadedFile;
	isDragActive: boolean;
}

function FileUploadState({ file, isDragActive }: FileUploadStateProps) {
	return (
		<Paper
			className={styles.fileUpload}
			data-drag-active={isDragActive || undefined}
		>
			{file ? (
				<ListItem
					aria-live="polite"
					secondaryAction={<FilePicker label="Replace" />}
				>
					<ListItemIcon>
						<Icon href={svgDocument} size="large" />
					</ListItemIcon>
					<ListItemText
						primary={file.name}
						secondary={
							<Typography variant="caption-sm" color="textSecondary">
								{formatBytes(file.size)}
							</Typography>
						}
					/>
				</ListItem>
			) : (
				<Stack direction="row" spacing={2} className={styles.emptyState}>
					<Icon href={svgUpload} />
					<Typography>
						Drag &amp; drop files here to upload them or&nbsp;
						<FilePicker label="browse files" />.
					</Typography>
				</Stack>
			)}
		</Paper>
	);
}

interface FilePickerProps {
	label: string;
}

function FilePicker({ label }: FilePickerProps) {
	return (
		<Link render={<label />} color="primary">
			<input type="file" style={visuallyHidden} />
			{label}
		</Link>
	);
}

function formatBytes(bytes: number) {
	if (bytes === 0) return "0 bytes";

	const units = ["bytes", "KB", "MB", "GB"];
	const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 3);
	const value = bytes / 1024 ** unitIndex;

	return `${value.toFixed(unitIndex === 0 || value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}
