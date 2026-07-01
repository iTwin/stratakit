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
- The `StepIcon` has been fully replaced with new icons and a custom CSS implementation.
- Reduced the hit target size of `StepButton`.
- The `connector` prop is used to add `aria-hidden="true"` to the `StepConnector`.
- Includes `forced-colors` support.

## Examples

### Optional

::example{src="mui/Stepper.optional"}

### StepButton

::example{src="mui/Stepper.clickable"}

### MobileStepper

::example{src="mui/MobileStepper.default" min-width="450px"}

### Long

In the long stepper, there are no labels underneath the step indicators to save space. Instead, the label for the step currently in progress appears under the diagram along with ‘Step X of X’. This allocates more space for longer step names, as well as allowing more step indicators to be contained within the diagram.

::example{src="mui/Stepper.long"}
