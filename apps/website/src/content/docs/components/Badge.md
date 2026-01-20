---
title: Badge
description: Badges show notifications, counts, or status information.
links:
  demo: tests/badge
  github: packages/bricks/src/Badge.tsx
  figma: https://www.figma.com/design/VcGw3L2IIlboxNlOdsKdai/%F0%9F%A5%9D-Kiwi-Component-Library?m=auto&node-id=15788-4347&t=T9SeT3ZhTheKzGlZ-1
---

## Use cases

Make sure the **Badge** is suitable for your use case. There may be other, more appropriate components available.

| Use case                                             | [Badge](/components/badge) | [Chip](/components/chip) |
| ---------------------------------------------------- | :------------------------: | :----------------------: |
| Showing notifications, counts, or status information |             ✅             |            ❌            |
| Filtering content and triggering actions             |             ❌             |            ✅            |

## Usage

::example{src="Badge.default"}

The [`label`](/reference/bricks/Badge#Badge.label) prop is required. Choose a concise `label` that describes the status clearly.

```jsx
<Badge label="Pending" />
```

### Icons

All [tones](#tones) except **neutral** and **accent** convey a specific type of status. Supplement those tones with an [`icon`](/reference/bricks/Badge#Badge.icon) so that color is not the only means of communication. See [WCAG’s Use Of Color](https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html).

For example, include the `status-warning` icon when applying the ‘critical’ tone.

::example{src="Badge.critical"}

```jsx
import { Badge } from "@stratakit/bricks";
import warningIcon from "@stratakit/icons/status-warning.svg";

export default () => {
	return <Badge label="Unstable" tone="critical" icon={warningIcon} />;
};
```

## Configurations

### Tone

Set a tone using the [`tone`](/reference/bricks/Badge#Badge.tone) prop.

::example{src="Badge.tones"}

- **Neutral:** The default.
- **Accent:** Use accent when high emphasis is required.
- **Info:** Use to call out an object or action as having an important attribute.
- **Positive:** Use to indicate a successful or completed state when it’s important to provide positive reinforcement.
- **Attention:** Use for warnings and time-sensitive issues that require attention and potential action.
- **Critical:** Use for critical and irreversible issues that requires attention and potential action. Apply sparingly.

:::caution[Using icons]
Tones only determine color. In most cases, you should supplement the `tone` with [iconography](#icons).
:::

### Variants

Set a variant using the [`variant`](/reference/bricks/Badge#Badge.variant) prop.

::example{src="Badge.variants"}

- **Solid:** The standard badge style for general interfaces.
- **Muted:** Used to lower emphasis in a busy interface.Outline: Another level of lower emphasis.
- **Outline:** Another level of lower emphasis

## ✅ Do

- Use **Badge** for indicating state or status.
- Include a concise and descriptive label.
- Use an [`icon`](/reference/bricks/Badge#Badge.icon) to communicate `tone` in a color-independent fashion.

## ❌ Don’t

- Don’t make **Badge** interactive. It is for indicating status, not controlling it.
- Don’t override colors set using `tone`. These have been chosen carefully for their [contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html).
