/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { useLocation, useSearchParams } from "react-router";

import type * as React from "react";

const modules = import.meta.glob("../../../../../examples/mui/*.tsx", {
	eager: true,
}) as Record<string, { default: React.FC }>;

export default function MuiExamplePage() {
	const { pathname } = useLocation();
	const [searchParams] = useSearchParams();

	const componentName = pathname.split("/").pop(); // "Button"
	const only = searchParams.get("only")?.split(","); // ["variants"] or undefined

	const entries = Object.entries(modules).filter(([key]) => {
		const fileName = key.split("/").pop(); // "Button.variants.tsx"
		if (!fileName?.startsWith(`${componentName}.`)) return false;
		if (only && componentName) {
			const variantName = fileName
				.replace(".tsx", "")
				.slice(componentName.length + 1);
			return only.includes(variantName);
		}
		return true;
	});

	if (entries.length === 0) {
		return <p>Example not found: {componentName}</p>;
	}

	return (
		<>
			{entries.map(([key, mod]) => {
				const Component = mod.default;
				return <Component key={key} />;
			})}
		</>
	);
}
