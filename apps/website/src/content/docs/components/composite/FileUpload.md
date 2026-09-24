---
title: File upload
description: File uploads let users select and attach one or more files.
---

::example{src="composite/FileUpload.default"}

Use a native [`<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file) to let users select one or more files. Provide feedback about the upload status so users know when their files have been received successfully.

## Examples

### Card

Show each selected file in a list with its filename, size, and an action to remove it. Allow users to drag and drop files onto the upload area as well as browse for files.

::example{src="composite/FileUpload.card"}

## ✅ Do

- Use a clear label such as "Upload" or "Browse files".
- Show selected filenames and file sizes so users can confirm their selection.

## 🚫 Don't

- Don't hide the only file-selection mechanism behind an unlabeled icon.
- Don't make drag and drop the only way to select files.

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
