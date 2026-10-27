---
title: File selection
description: File selection lets users choose one or more files from their device.
---

::example{src="composite/FileSelection.default"}

Use a native [`<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file) to let users select files. Selecting a file does not upload it; provide separate feedback when an application starts or completes an upload.

## Examples

### Drag and drop

Show selected files in a list with their filenames, sizes, and actions to remove them. Let users select files by browsing or dragging and dropping them onto the selection area.

::example{src="composite/FileSelection.drag-and-drop"}

## ✅ Do

- Use a clear label such as "Select files" or "Browse files".
- Show selected filenames and file sizes so users can confirm their selection.

## 🚫 Don't

- Don't hide the only file-selection mechanism behind an unlabeled icon.
- Don't make drag and drop the only way to select files.
- Don't upload files immediately after selection; let the user confirm the upload first.

## API reference

- [`Button`](https://mui.com/material-ui/api/button/)
- [`IconButton`](https://mui.com/material-ui/api/icon-button/)
- [`Link`](https://mui.com/material-ui/api/link/)
- [`List`](https://mui.com/material-ui/api/list/)
- [`ListItem`](https://mui.com/material-ui/api/list-item/)
- [`ListItemIcon`](https://mui.com/material-ui/api/list-item-icon/)
- [`ListItemText`](https://mui.com/material-ui/api/list-item-text/)
- [`Paper`](https://mui.com/material-ui/api/paper/)
- [`Stack`](https://mui.com/material-ui/api/stack/)
- [`Typography`](https://mui.com/material-ui/api/typography/)
- [`Icon`](/reference/mui/Icon)
- [`<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file)
