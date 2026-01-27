# Changelog

## 0.3.0

### Minor Changes

- [#1163](https://github.com/iTwin/design-system/pull/1163): Removed `license-remove.svg` which was previously deprecated and aliased to `license-minus.svg`.

## 0.2.2

- [#1104](https://github.com/iTwin/design-system/pull/1104): Added new icons:
  - `microscope.svg`
  - `scene.svg`
  - `thumbs-down.svg`
  - `thumbs-up.svg`

## 0.2.1

- [#1084](https://github.com/iTwin/design-system/pull/1084): Renamed `license-remove.svg` to `license-minus.svg`.

  `license-remove.svg` is now considered deprecated and will be removed in a future release.

## 0.2.0

### Breaking changes

- [#1015](https://github.com/iTwin/design-system/pull/1015): Some icons have been renamed for better clarity and consistency.

  | Old name                       | New name                     |
  | ------------------------------ | ---------------------------- |
  | `close.svg`                    | `dismiss.svg`                |
  | `remove.svg`                   | `minus.svg`                  |
  | `remove-circular.svg`          | `minus-circle.svg`           |
  | `remove-squared.svg`           | `minus-square.svg`           |
  | `add-circular.svg`             | `add-circle.svg`             |
  | `add-squared.svg`              | `add-square.svg`             |
  | `more-horizontal-circular.svg` | `more-horizontal-circle.svg` |
  | `more-vertical-circular.svg`   | `more-vertical-circle.svg`   |
  | `pause-circular.svg`           | `pause-circle.svg`           |
  | `play-circular.svg`            | `play-circle.svg`            |
  | `stop-circular.svg`            | `stop-circle.svg`            |
  | `zoom-in-circular.svg`         | `zoom-in-circle.svg`         |
  | `zoom-out-circular.svg`        | `zoom-out-circle.svg`        |

  ⚠️ This is a **breaking change**. Make sure to update all references/imports to the old icon names in your codebase.

### Non-breaking changes

- [#1042](https://github.com/iTwin/design-system/pull/1042): Added new icons:
  - `ai-chat-add.svg`
  - `ai-chat.svg`
  - `area-island-traffic.svg`
  - `area-pond.svg`
  - `brain.svg`
  - `carets-up-down.svg`
  - `dashboard.svg`
  - `dismiss-circle.svg`
  - `dismiss-square.svg`
  - `downloads-view.svg`
  - `license-add.svg`
  - `license-check-in.svg`
  - `license-check-out.svg`
  - `license-download.svg`
  - `license-remove.svg`
  - `parking-row.svg`
  - `password-reset.svg`
  - `portal-connect.svg`
  - `products.svg`
  - `subscriptions.svg`
  - `support.svg`
  - `table-rows-comfortable.svg`
  - `table-rows-compact.svg`
  - `user-active.svg`
  - `user-edit.svg`
  - `user-settings.svg`

## 0.1.5

- [#911](https://github.com/iTwin/design-system/pull/911): Added new icons:
  - `dimension-angle.svg`
  - `dimension-linear.svg`
  - `dimension-ordinate.svg`
  - `dimension-radial.svg`
  - `drawing-view-create.svg`
  - `production-drawing.svg`
  - `sheet.svg`
  - `table-column-insert-right.svg`
  - `table-row-insert-below.svg`

## 0.1.4

- [#896](https://github.com/iTwin/design-system/pull/896): Added icons:
  - `area-parking.svg`
  - `boundary-property.svg`
  - `equals.svg`
  - `eraser.svg`
  - `grading-constraints.svg`
  - `rule-delta-create.svg`
  - `rule-slope-create.svg`
  - `vertex-control-direction.svg`
  - `vertex-control-slope.svg`
  - `vertex-mesh-add.svg`
  - `vertex-mesh-control.svg`

  Updated icons:
  - `table.svg`
  - `visibility-invert.svg`

## 0.1.3

- [#850](https://github.com/iTwin/design-system/pull/850): Added icons:
  - `drone.svg`
  - `error.svg`
  - `regenerate.svg`
  - `reschedule.svg`
  - `warning.svg`

  Updated icons:
  - `filter.svg`
  - `important.svg`
  - `merge.svg`

## 0.1.2

- [#754](https://github.com/iTwin/design-system/pull/754): Added icons:
  - `inspection.svg`
  - `power-bi.svg`
  - `document-pdf.svg`
  - `document-migration.svg`
  - `deliverables.svg`
  - `building.svg`
  - `visibility-disabled.svg`
  - `vertex-remove.svg`
  - `vertex-edit.svg`
  - `vertex-add.svg`
  - `underground-storage.svg`
  - `toilet.svg`
  - `point-parking-space.svg`
  - `point-parking-island.svg`
  - `point-parking-direction.svg`
  - `point-parking-bay.svg`
  - `point-parking-aisle.svg`
  - `pipe-water.svg`
  - `pipe-sewer.svg`
  - `path-break.svg`
  - `parking.svg`
  - `object-transform.svg`
  - `object-offset.svg`
  - `object-edit.svg`
  - `object-copy.svg`
  - `object-array.svg`
  - `mesh-surface.svg`
  - `mesh.svg`
  - `measure-radius.svg`
  - `measure-perpendicular-distance.svg`
  - `measure-location.svg`
  - `measure-distance.svg`
  - `measure-area.svg`
  - `measure-angle.svg`
  - `manhole-sewer.svg`
  - `layout.svg`
  - `explode.svg`
  - `drop.svg`
  - `drainage.svg`
  - `cross-section-two-point.svg`
  - `cross-section-three-point.svg`
  - `cross-section-profile.svg`
  - `cross-section-perpendicular.svg`
  - `cross-section.svg`
  - `compass.svg`
  - `cloud-lightning.svg`
  - `bulldozer.svg`
  - `boolean.svg`
  - `assemble.svg`
  - `tree-item-unlocked.svg`
  - `tree-item-locked.svg`
  - `form.svg`
  - `cesium.svg`
  - `bis-item-generic.svg`

  Updated icons:
  - `document.svg`
  - `retry.svg`

- [#755](https://github.com/iTwin/design-system/pull/755): All icons have been updated.
  - Small adjustments to size and negative space for better visual alignment.
  - Some icons redrawn using new shapes.
  - Simplified attributes on the `<path>` elements.

## 0.1.1

- [#733](https://github.com/iTwin/design-system/pull/733): Added snapping related icons:
  - `snap-bisector.svg`
  - `snap-endpoint.svg`
  - `snap-center.svg`
  - `snap-extension.svg`
  - `snap-keypoint.svg`
  - `snap-origin.svg`
  - `snap-midpoint.svg`
  - `snap-nearest.svg`
  - `snap-intersection.svg`
  - `snap-perpendicular.svg`
  - `snap-quadrant.svg`
  - `snap-tangent.svg`
  - `snap-parallel.svg`

## @stratakit/icons@0.1.0

- **breaking**: Package name changed to `@stratakit/icons`.
- [#649](https://github.com/iTwin/design-system/pull/649): **breaking**: Fixed typo in `visibility-invert.svg`.

## @itwin/itwinui-icons@5.0.0-alpha.7

- **breaking**: Removed `dismiss.svg` and `panel-left.svg`. See [#539](https://github.com/iTwin/design-system/pull/539).
- Added 19 new icons.
