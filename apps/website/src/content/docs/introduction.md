---
title: Introduction to StrataKit
description: An overview of the **StrataKit** design system
---

**StrataKit** is a unique design system. It supports interfaces for completing complex tasks and solving big problems. A collaboration between researchers, designers, engineers, and accessibility experts, **StrataKit** is developed at **Bentley Systems** to serve a diverse construction and infrastructure product range.

Drawing its name from _strata_ (the vertical layers in rock), **StrataKit** is organized into independent but related categories. **Tokens** and **Icons** are foundational, used in defining individual **Components** which, in turn, combine to make larger **Patterns**. This documentation site is considered part of **StrataKit** itself, since it exemplifies proper use of the system.


## Tokens

**StrataKit’s** design tokens (aka "variables") were built from the ground up, with accessibility in mind. Colors are defined using the [Oklab color space](https://en.wikipedia.org/wiki/Oklab_color_space) for its wide gamut and programmatic composability in CSS. The typographic scale is optimized for readability in dense and complex interfaces. [Inter](https://rsms.me/inter/) is **StrataKit’s** principle font, chosen for its configurability via multiple OpenType features.

## Icons

**StrataKit** has an extensive collection of meticulously crafted icons, available as a [standalone package](https://www.npmjs.com/package/@stratakit/icons). Each icon is available as two designs, optimized for different sizes, making **over 1000 icons** in total. For consistency, every icon is formed from just four key shapes and strictly adheres to a common stroke, grid, and directionality. 

## Components

Elemental **StrataKit** components are taken from the open source **Material UI** (MUI) library and **StrataKit’s** custom MUI theme is optimized for accessibility. More complex and specialized components are custom made, incorporating the same **Tokens** for consistency. This site exemplifies how to correctly implement the entire component catalogue.

## Patterns

When making interfaces used in construction and infrastructure design, some specific—and sometimes highly complex—patterns emerge. **StrataKit** documents these patterns so that multiple teams can implement them according to their individual use cases. This site details how to calibrate the pattern using the **Token**, **Icon**, and **Component** libraries offered.
