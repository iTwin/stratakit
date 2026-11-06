---
"@stratakit/mui": minor
---

Added `slotProps` prop to `DialogTitle`. Use it to customize the header element of the dialog, when the `actions` prop is provided.

```tsx
slotProps={{
  header: {
    className: "draggable-header",
    onPointerDown: handlePointerDown,
  },
}}
```
