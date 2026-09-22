/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import visuallyHidden from "@mui/utils/visuallyHidden";
import { Icon } from "@stratakit/mui";

import svgDismiss from "@stratakit/icons/dismiss.svg";
import svgDocument from "@stratakit/icons/document.svg";
import svgUpload from "@stratakit/icons/upload.svg";
import styles from "./FileUpload.card.module.css";

export default () => {
	const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
	const [isDragActive, setIsDragActive] = React.useState(false);

	const selectFiles = (files: FileList | null) => {
		setSelectedFiles(Array.from(files ?? []));
	};

	return (
		<Paper
			className={`${styles.states} ${styles.fileUpload}`}
			data-drag-active={isDragActive || undefined}
			onDragEnter={(event) => {
				event.preventDefault();
				if (Array.from(event.dataTransfer.items).some(isFileItem)) {
					setIsDragActive(true);
				}
			}}
			onDragOver={(event) => event.preventDefault()}
			onDragLeave={(event) => {
				if (!event.currentTarget.contains(event.relatedTarget as Node)) {
					setIsDragActive(false);
				}
			}}
			onDrop={(event) => {
				event.preventDefault();
				setIsDragActive(false);
				selectFiles(event.dataTransfer.files);
			}}
		>
			{selectedFiles.length ? (
				<List aria-live="polite">
					{selectedFiles.map((file, index) => (
						<ListItem
							key={`${file.name}-${file.lastModified}`}
							secondaryAction={
								<IconButton
									label={`Remove ${file.name}`}
									onClick={() => {
										setSelectedFiles((files) =>
											files.filter((_, fileIndex) => fileIndex !== index),
										);
									}}
								>
									<Icon href={svgDismiss} />
								</IconButton>
							}
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
					))}
				</List>
			) : (
				<Stack direction="row" spacing={2} className={styles.emptyState}>
					<Icon href={svgUpload} />
					<Typography>
						Drag &amp; drop files here to upload them or&nbsp;
						<FilePicker label="browse files" onFilesChange={selectFiles} />.
					</Typography>
				</Stack>
			)}
		</Paper>
	);
};

interface FilePickerProps {
	label: string;
	onFilesChange: (files: FileList | null) => void;
}

function FilePicker({ label, onFilesChange }: FilePickerProps) {
	return (
		<Link render={<label />} color="primary">
			<input
				type="file"
				multiple
				style={visuallyHidden}
				className={styles.input}
				onChange={(event) => {
					onFilesChange(event.currentTarget.files);
					event.currentTarget.value = "";
				}}
			/>
			{label}
		</Link>
	);
}

function isFileItem(item: DataTransferItem) {
	return item.kind === "file";
}

function formatBytes(bytes: number) {
	if (bytes === 0) return "0 bytes";

	const units = ["bytes", "KB", "MB", "GB"];
	const unitIndex = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), 3);
	const value = bytes / 1024 ** unitIndex;

	return `${value.toFixed(unitIndex === 0 || value >= 10 ? 0 : 1)} ${units[unitIndex]}`;
}
