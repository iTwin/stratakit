---
"@stratakit/foundations": minor
---

The `Root` component will no longer detect the [root node](https://developer.mozilla.org/en-US/docs/Web/API/Node/getRootNode) automatically. By default, it will use `document`. When rendering in shadow DOM or a popout window, you will need to pass the `rootNode` prop to the `Root` component.

```tsx
<Root rootNode={/* shadowRoot or popoutWindow.document */}>
```
