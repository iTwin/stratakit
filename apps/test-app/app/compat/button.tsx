/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Button } from "@stratakit/react";
import { definePage } from "~/~utils.tsx";

import placeholderIcon from "@stratakit/icons/placeholder.svg";

export const handle = { title: "Button" };

export default definePage(function Page() {
	return (
		<div style={{ display: "grid", gap: 4, justifyItems: "start" }}>
			{(["default", "high-visibility", "cta", "borderless"] as const).map(
				(styleType) => {
					return (
						<div key={styleType} style={{ display: "flex", gap: 4 }}>
							<Button styleType={styleType}>Click me</Button>

							<Button
								styleType={styleType}
								startIcon={
									<svg>
										<use href={`${placeholderIcon}#icon`} />
									</svg>
								}
								endIcon={
									<svg>
										<use href={`${placeholderIcon}#icon`} />
									</svg>
								}
							>
								Click me
							</Button>

							<Button styleType={styleType} disabled>
								Click me
							</Button>

							<Button styleType={styleType} as="a" href="#">
								Click me
							</Button>
						</div>
					);
				},
			)}

			<Button htmlDisabled>Click me</Button>

			<Button
				startIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
				startIconProps={{ style: { outline: "1px solid DeepPink" } }}
				endIcon={
					<svg>
						<use href={`${placeholderIcon}#icon`} />
					</svg>
				}
				endIconProps={{ style: { outline: "1px solid DeepPink" } }}
			>
				Click me
			</Button>

			<hr style={{ justifySelf: "stretch" }} />

			{/* NOT IMPLEMENTED */}
			<Button size="small">Click me</Button>
			<Button size="large">Click me</Button>
			<Button stretched>Click me</Button>
			<Button loading>Click me</Button>
		</div>
	);
});
