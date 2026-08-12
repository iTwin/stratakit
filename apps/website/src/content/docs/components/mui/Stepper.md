---
title: Stepper
description: Steppers are used to display progress through a sequence of steps.
links:
  muiDocs: https://mui.com/material-ui/react-stepper/
  apiReference: https://mui.com/material-ui/api/stepper/
---

::example{src="mui/Stepper.default"}

## StrataKit MUI modifications

- Lightly styled using StrataKit's visual language.
- The `connector` prop of `Stepper` is not supported.
- The `StepIcon` has been fully replaced with new icons and a custom CSS implementation.
- Reduced the hit target size of `StepButton`.
- Ripple effect removed from `StepButton`. The `centerRipple`, `disableRipple`, `disableTouchRipple`, `focusRipple`, `TouchRippleProps` and `touchRippleRef` props are not supported.
- The `action` prop of `StepButton` is not supported.
- The `connector` prop is used to add `aria-hidden="true"` to the `StepConnector`.
- Includes `forced-colors` support.

## Examples

### Optional

::example{src="mui/Stepper.optional"}

### StepButton

::example{src="mui/Stepper.clickable"}

### MobileStepper

::example{src="mui/MobileStepper.default" min-width="450px"}
