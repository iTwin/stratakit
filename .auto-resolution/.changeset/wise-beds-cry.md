---
"@stratakit/structures": minor
---

Renamed `DropdownMenu.Root` component to `DropdownMenu.Provider`.

```diff
- <DropdownMenu.Root>
+ <DropdownMenu.Provider>
    <DropdownMenu.Button>…</DropdownMenu.Button>
    <DropdownMenu.Content>…</DropdownMenu.Content>
- </DropdownMenu.Root>
+ </DropdownMenu.Provider>
```

This change makes StrataKit's naming convention more consistent. `Root` components always render a DOM element whereas `Provider` components have no underlying DOM element.
