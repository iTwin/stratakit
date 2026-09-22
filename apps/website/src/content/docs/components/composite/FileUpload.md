---
title: File upload
description: File uploads let users select and attach one or more files.
---

::example{src="composite/FileUpload.default"}

## Use cases

Make sure **File upload** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                        | [File upload](/components/fileupload) | [TextField](/components/textfield) | [Button](/components/button) |
| ----------------------------------------------- | ------------------------------------- | ---------------------------------- | ---------------------------- |
| Select one or more files from the user's device | ✅                                    | ❌                                 | ❌                           |
| Enter text or metadata                          | ❌                                    | ✅                                 | ❌                           |
| Trigger an action without selecting files       | ❌                                    | ❌                                 | ✅                           |

## Examples

### Default

Use a native [`<input type="file">`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/file) paired with [`Button`](/components/button) for the most basic file upload experience. You'll want to give the user some indication that the file was successfully uploaded.

### Card

Show each selected file in a list with its filename, size, and an action to remove it. Allow users to drag and drop files onto the upload area as well as browse for files.

::example{src="composite/FileUpload.card"}

## ✅ Do

- Use a clear label such as "Upload" or "Browse files".
- Show selected filenames and file sizes so users can confirm their selection.

## 🚫 Don't

- Don't hide the only file-selection mechanism behind an unlabeled icon.
- Don't make drag and drop the only way to select files.
