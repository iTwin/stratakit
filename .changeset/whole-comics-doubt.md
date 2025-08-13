---
"@stratakit/structures": minor
---

Renamed `Tabs.Root` component to `Tabs.Provider`.

```diff
- <Tabs.Root>
+ <Tabs.Provider>
    <Tabs.TabList>…</Tabs.TabList>
    <Tabs.TabPanel>…</Tabs.TabPanel>
- </Tabs.Root>
+ </Tabs.Provider>
```

This change makes StrataKit's naming convention more consistent. `Root` components always render a DOM element whereas `Provider` components have no underlying DOM element.
