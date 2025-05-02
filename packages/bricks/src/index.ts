/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
"use client";

export { Anchor } from "./Anchor.js";
export { Avatar } from "./Avatar.js";
export { AvatarGroup } from "./AvatarGroup.js";
export { Badge } from "./Badge.js";
export { Banner as unstable_Banner } from "./Banner.js";
export { Button } from "./Button.js";
export { Checkbox } from "./Checkbox.js";
export { Chip } from "./Chip.js";
export { Description } from "./Description.js";
export * as DropdownMenu from "./DropdownMenu.js";
export * as unstable_ErrorRegion from "./ErrorRegion.js";
export { Divider } from "./Divider.js";
export { IconButton } from "./IconButton.js";
export * as Field from "./Field.js";
export { Kbd } from "./Kbd.js";
export { Label } from "./Label.js";
export { ProgressBar } from "./ProgressBar.js";
export { Radio } from "./Radio.js";
export * as Select from "./Select.js";
export { Spinner } from "./Spinner.js";
export { Skeleton } from "./Skeleton.js";
export { Switch } from "./Switch.js";
export * as Table from "./Table.js";
export * as Tabs from "./Tabs.js";
export { Text } from "./Text.js";
export * as TextBox from "./TextBox.js";
export * as unstable_Toolbar from "./Toolbar.js";
export { Tooltip } from "./Tooltip.js";
export * as Tree from "./Tree.js";
export { VisuallyHidden } from "./VisuallyHidden.js";

import { Icon, Root } from "@stratakit/foundations";

/** @deprecated Please import `Root` from `"@stratakit/foundations"` instead. */
const RootDeprecated = Root as typeof Root;
/** @deprecated Please import `Icon` from `"@stratakit/foundations"` instead. */
const IconDeprecated = Icon as typeof Icon;

export { RootDeprecated as Root, IconDeprecated as Icon };
