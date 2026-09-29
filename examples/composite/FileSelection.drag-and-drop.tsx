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
import { svgDismiss } from "@stratakit/icons/dismiss";
import { svgDocument } from "@stratakit/icons/document";
import { svgUpload } from "@stratakit/icons/upload";
import { Icon } from "@stratakit/mui";

import styles from "./FileSelection.drag-and-drop.module.css";

export default () => {
	const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
	const [isDragActive, setIsDragActive] = React.useState(false);
	const headingRef = React.useRef<HTMLHeadingElement>(null);
	const browseInputRef = React.useRef<HTMLInputElement>(null);
	const focusTarget = React.useRef<"heading" | "browse" | null>(null);

	const selectFiles = (files: FileList | null) => {
		const fileArray = Array.from(files ?? []);
		if (fileArray.length) focusTarget.current = "heading";
		setSelectedFiles(fileArray);
	};

	React.useEffect(() => {
		if (focusTarget.current === "heading") headingRef.current?.focus();
		if (focusTarget.current === "browse") browseInputRef.current?.focus();
		focusTarget.current = null;
	});

	return (
		<Paper
			className={`${styles.states} ${styles.fileSelection}`}
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
				<>
					<Typography
						variant="subtitle-md"
						render={<h2 />}
						ref={headingRef}
						tabIndex={-1}
						className={styles.heading}
					>
						{selectedFiles.length === 1
							? "1 file selected"
							: `${selectedFiles.length} files selected`}
					</Typography>
					<List aria-label="Files selected">
						{selectedFiles.map((file, index) => (
							<ListItem
								key={`${file.name}-${file.lastModified}`}
								className={styles.fileItem}
								secondaryAction={
									<IconButton
										label={`Remove ${file.name}`}
										onClick={() => {
											if (selectedFiles.length === 1) {
												focusTarget.current = "browse";
											}
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
										<Typography variant="caption-lg" color="textSecondary">
											{formatBytes(file.size)}
										</Typography>
									}
								/>
							</ListItem>
						))}
					</List>
				</>
			) : (
				<Stack direction="row" spacing={2} className={styles.emptyState}>
					<Icon href={svgUpload} />
					<Typography>
						Drag &amp; drop files here to select them or&nbsp;
						<FilePicker
							label="browse files"
							onFilesChange={selectFiles}
							inputRef={browseInputRef}
						/>
						.
					</Typography>
				</Stack>
			)}
		</Paper>
	);
};

interface FilePickerProps {
	label: string;
	onFilesChange: (files: FileList | null) => void;
	inputRef?: React.Ref<HTMLInputElement>;
}

function FilePicker({ label, onFilesChange, inputRef }: FilePickerProps) {
	return (
		<Link render={<label />} color="primary" className={`${styles.link}`}>
			<input
				ref={inputRef}
				type="file"
				multiple
				style={visuallyHidden}
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
