---
"@stratakit/structures": patch
---

Added `Dialog` component that displays custom content in a window overlay over the primary window or another dialog window. Currently only modal dialog type is supported.

```tsx
const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open dialog</Button>
<Dialog.Root open={open} onClose={() => setOpen(false)}>
  <Dialog.Header render={<Dialog.Heading />}>Dialog title</Dialog.Header>
  <Dialog.Content>
    Content that describes the primary purpose of the dialog.
  </Dialog.Content>
  <Dialog.Footer>
    <Dialog.DismissButton>Cancel</Dialog.DismissButton>
    <Dialog.DismissButton render={<Button tone="accent" />}>Ok</Dialog.DismissButton>
  </Dialog.Footer>
</Dialog.Root>
```
