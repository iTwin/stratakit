---
"@stratakit/structures": patch
---

Fixed an issue where `AccordionItem.Content` was being offset by decorations placed at the end of `AccordionItem.Header`. The content will now only include start indentation, and correctly stretch all the way up to the right edge.
