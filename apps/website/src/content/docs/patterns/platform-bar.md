---
title: Platform Bar
description: Cross‑product navigation across a shared product ecosystem
---

The **Platform Bar** pattern uses the [**Navigation Rail**](/components/navigationrail) component for consistent global navigation. It supports navigation within the current application and between applications in the same ecosystem.

The **Platform Bar** enables predictable navigation patterns that help users remain oriented and move efficiently between primary workflows across products.

![A screen with the Platform Bar positioned on the left-hand side](../../../assets/images/platform_bar_screen.jpeg)

## Use cases

Make sure the **Platform Bar** pattern is suitable for your use cases. There may be more appropriate components available.

The Platform Bar helps users to:

- Maintain context while navigating between product's areas
- Build a consistent mental model across products
- Access primary sections and frequently used actions quickly 

| Use case                                                 | Platform Bar ([Navigation Rail](/components/navigationrail)) | [Breadcrumbs](/components/breadcrumbs/) | [Tabs](/components/tabs)                | [Pagination](/components/pagination/)   | [Stepper](/components/stepper)        | [Toolbar](/components/toolbar)         | [Menu](/components/menu) |
| -------------------------------------------------------- | ------------------------------------------------------------ | --------------------------------------- | --------------------------------------- | --------------------------------------- | ------------------------------------- | -------------------------------------- | ------------------------ |
| Top‑level application, product, or portal navigation     | ✅                                                            | ❌                                      | ❌                                      | ❌                                      | ❌                                    | ❌                                     | ❌                        |
| Switching between major product areas or workflows       | ✅                                                            | ❌                                      | ❌                                      | ❌                                      | ❌                                    | ❌                                     | ❌                        |
| Task‑level or contextual actions                         | ❌                                                            | ❌                                      | ❌                                      | ❌                                      | ❌                                    | ✅                                     | ✅                        |
| Deep navigation within a specific workflow               | ❌                                                            | ❌                                      | ❌                                      | ✅                                      | ✅                                    | ❌                                     | ❌                        |
| In‑context navigation                                    | ❌                                                            | ✅                                      | ✅                                      | ❌                                      | ❌                                    | ❌                                     | ❌                        |
 
## Anatomy

The **Platform Bar** is structured as follows.

| Section                      | Purpose                                                                                                                                                                                                          | Component                |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------ |
| 1. **Project home**          | Available only when a project is selected in the header, the project home provides access to project‑specific content.                                                                                           | `NavigationRail.Header`  |
| 2. **Project Overview Tray** | The **Project Overview Tray** serves as a central hub for project‑level information and actions. This tray helps users quickly understand the current state of the project and identify what requires attention. | `NavigationRail.Content` |
| 3. **Capabilities Tray**     | The **Capabilities Tray** provides entry points to the core features, tools, and workflows available to the user.                                                                                                | `NavigationRail.Content` |
| 4. **Utilities**             | Supporting tools and system functions, including notifications, help, application settings, and user profile access.                                                                                             | `NavigationRail.Footer`  |

![Diagram numbering the different sections from 1 (at the top) to 4 (at the bottom)](../../../assets/images/platform_bar_anatomy.jpeg)

## Interaction

The **Platform Bar** must conform to certain rules of interaction:

- The **Platform Bar** remains fixed on screen and can be expanded or collapsed to support different workflows.
- The **Platform Bar** remains visible across all core product views. 
- The active navigation item—marked using the [`active` prop](https://stratakit.bentley.com/docs/reference/structures/NavigationRail/#NavigationRail.Anchor.active)—always reflects the user’s current location. 
- Users can navigate between locations without losing data or interrupting in‑progress work. 
- Each navigation item has a suitable [`label`](https://stratakit.bentley.com/docs/reference/structures/NavigationRail/#NavigationRail.Anchor.label), appearing as a tooltip on hover or focus.
- Selecting a navigation item opens a second‑level flyout that adapts to the content height. 
- Users can pin capabilities to appear always first (see BIC's prototype)

## Examples

![Set of three example implementations from 3 Bentley products. From left to right, it’s Open X, ITS, and BIC.](../../../assets/images/platform_bar_examples.jpeg)
