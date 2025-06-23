/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import { Anchor, Button } from "@stratakit/bricks";
import { unstable_ErrorRegion as ErrorRegion } from "@stratakit/structures";
import { definePage } from "~/~utils.tsx";

export const handle = { title: "Error Region" };

export default definePage(function Page({ items = 2, controls }) {
	const [errors, setErrors] = React.useState(() => {
		return Array.from({ length: Number(items) }).map((_, index) => index + 1);
	});
	const errorsLength = errors.length;
	const label = React.useMemo(() => {
		if (errorsLength <= 0) return undefined;
		if (errorsLength === 1) return "1 issue found";
		return `${errorsLength} issues found`;
	}, [errorsLength]);
	return (
		<div style={{ minHeight: 200 }}>
			{controls ? (
				<Button
					onClick={() => {
						setErrors((prev) => [...prev, (prev[prev.length - 1] ?? 0) + 1]);
					}}
				>
					Add
				</Button>
			) : undefined}
			<ErrorRegion.Root
				label={label}
				items={errors.map((error) => {
					return (
						<ErrorRegion.Item
							key={error}
							message={
								<>
									<span>Failed to create hierarchy for </span>
									<Anchor href="#">Item {error}</Anchor>
								</>
							}
							actions={
								<Anchor
									render={<button />}
									key="retry"
									onClick={() =>
										setErrors((prev) => prev.filter((e) => e !== error))
									}
								>
									Retry
								</Anchor>
							}
						/>
					);
				})}
			/>
		</div>
	);
});
