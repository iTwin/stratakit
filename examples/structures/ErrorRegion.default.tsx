/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import Link from "@mui/material/Link";
import { unstable_ErrorRegion as ErrorRegion } from "@stratakit/structures";

export default () => {
	const errors = [1, 2];
	return (
		<ErrorRegion.Root
			aria-label="Hierarchy issues"
			label={`${errors.length} issues found`}
			items={errors.map((errorItem) => (
				<ErrorRegion.Item
					key={errorItem}
					message={<>Failed to create hierarchy for Item {errorItem}</>}
					actions={<Link render={<button />}>Retry</Link>}
				/>
			))}
		/>
	);
};
