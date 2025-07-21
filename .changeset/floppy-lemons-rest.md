---
"@stratakit/structures": patch
---

Added `Dialog` component that displays custom content in a window overlay over the primary window or another dialog window. Currently only modal dialog type is supported.

```tsx
<Dialog.Provider>
	<Dialog.Disclosure>Open dialog</Dialog.Disclosure>

	<Dialog.Root>
		<Dialog.Heading>Dialog title</Dialog.Heading>
		<Dialog.Content render={<Dialog.Description />}>
			Content that describes the primary purpose of the dialog.
		</Dialog.Content>
		<Dialog.Actions>
			<Dialog.DismissButton>Cancel</Dialog.DismissButton>
			<Dialog.DismissButton render={<Button tone="accent" />}>Ok</Dialog.DismissButton>
		</Dialog.Actions>
	</Dialog.Root>
</Dialog.Provider>
```
