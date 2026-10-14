/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";

export function SvgStrataKitLogo(props: React.ComponentProps<"svg">) {
	const basePathId = React.useId();
	const gradientId = React.useId();

	const defs = (
		<defs>
			<path
				id={basePathId}
				d="M8.03 16.9h9.68l2.42 2.42v.81H6.42L4 17.71v-2.42h2.42zm0-6.45h9.68l2.42 2.42v2.42h-2.42l-1.61-1.61H6.42L4 11.26V8.84h2.42zm12.1-4.03v2.42h-2.42L16.1 7.23H6.42L4 4.8V4h13.71z"
			/>

			<linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
				<stop offset="0" stopOpacity="0" />
				<stop offset="1" />
			</linearGradient>
		</defs>
	);

	return (
		<svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
			{defs}
			<g>
				<use
					href={`#${basePathId}`}
					fill="var(--stratakit-color-brand-logo-fill)"
				/>
				<use
					href={`#${basePathId}`}
					fill={`url(#${gradientId})`}
					fillOpacity=".24"
				/>
				<use
					href={`#${basePathId}`}
					stroke="var(--stratakit-color-brand-logo-stroke)"
					strokeWidth={0.5}
				/>
			</g>
		</svg>
	);
}
