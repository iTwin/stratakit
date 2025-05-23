---
"@stratakit/structures": minor
---

`unstable_AccordionItem` breaking changes:

- `AccordionItem.Trigger` renamed to `AccordionItem.Header` and no longer represents the underlying `<button>` element (see `AccordionItem.Label`).
- `AccordionItem.Label` must be wrapped with the new `AccordionItem.Button`.

```diff
 <AccordionItem.Root>
+  <AccordionItem.Header>
-  <AccordionItem.Trigger>
+    <AccordionItem.Button>
+      <AccordionItem.Label>Label</AccordionItem.Label>
+    </AccordionItem.Button>
-    <AccordionItem.Label>Label</AccordionItem.Label>
+  </AccordionItem.Header>
-  </AccordionItem.Trigger>
   <AccordionItem.Content>Body</AccordionItem.Content>
 </AccordionItem.Root>
```
