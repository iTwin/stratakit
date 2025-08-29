---
"@stratakit/structures": patch
---

Added new `unstable_NavigationRail` component intended to serve as the application's top-level navigation (e.g. for switching between pages).

```jsx
<NavigationRail.Root>
  <NavigationRail.Header>
    <IconButton label="…" icon={…} href="/" />
    <NavigationRail.ToggleButton />
  </NavigationRail.Header>

  <NavigationRail.Content>
    <NavigationRail.List>
      <NavigationRail.ListItem>
        <NavigationRail.Anchor label="…" icon={…} href="/…" />
      </NavigationRail.ListItem>
      <NavigationRail.ListItem>
        <NavigationRail.Anchor label="…" icon={…} href="/…" />
      </NavigationRail.ListItem>
      <NavigationRail.ListItem>
        <NavigationRail.Anchor label="…" icon={…} href="/…" />
      </NavigationRail.ListItem>
    </NavigationRail.List>

    <NavigationRail.Footer>
      <NavigationRail.List>
        <NavigationRail.ListItem>
          <NavigationRail.Button label="…" icon={…} onClick={…} />
        </NavigationRail.ListItem>
        <NavigationRail.ListItem>
          <NavigationRail.Button label="…" icon={…} onClick={…} />
        </NavigationRail.ListItem>
      </NavigationRail.List>
   </NavigationRail.Footer>
  </NavigationRail.Content>
</NavigationRail.Root>
```
