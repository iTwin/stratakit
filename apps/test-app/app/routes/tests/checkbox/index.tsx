/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Checkbox, Label, VisuallyHidden } from "@itwin/kiwi-react/bricks";
import { useSearchParams } from "@remix-run/react";
import { useId } from "react";

export const handle = { title: "Checkbox" };

export default function Page() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const indeterminate = searchParams.get("indeterminate") === "true";
	const disabled = searchParams.get("disabled") === "true";
	const visualTest = searchParams.get("visual") === "true";

	const id = useId();
	const customIconProps = useCustomIcons();

	if (visualTest) {
		return <VisualTest />;
	}

	return (
		<>
			<Checkbox
				id={id}
				defaultChecked={indeterminate ? "mixed" : checked}
				disabled={disabled}
				{...customIconProps}
			/>
			<Label htmlFor={id}>Toggle me</Label>
		</>
	);
}

function VisualTest() {
	const [searchParams] = useSearchParams();
	const checked = searchParams.get("checked") === "true";
	const indeterminate = searchParams.get("indeterminate") === "true";
	const disabled = searchParams.get("disabled") === "true";

	const id = useId();
	const customIconProps = useCustomIcons();

	return (
		<>
			<Checkbox
				id={id}
				defaultChecked={indeterminate ? "mixed" : checked}
				disabled={disabled}
				{...customIconProps}
			/>
			<VisuallyHidden render={<Label htmlFor={id} />}>Toggle me</VisuallyHidden>
		</>
	);
}

function useCustomIcons() {
	const [searchParams] = useSearchParams();
	const customIcons = searchParams.has("custom-icons");

	return {
		"data-kiwi-custom-icon": customIcons ? "" : undefined,
		style: customIcons
			? ({
					"--🥝checkbox-unchecked-svg": `url("${new URL("@itwin/kiwi-icons/visibility-hide.svg", import.meta.url).href}")`,
					"--🥝checkbox-checkmark-svg": `url("${new URL("@itwin/kiwi-icons/visibility-show.svg", import.meta.url).href}")`,
					"--🥝checkbox-indeterminate-svg": `url("${new URL("@itwin/kiwi-icons/visibility-show.svg", import.meta.url).href}")`,
				} as React.CSSProperties)
			: {},
	};
}
