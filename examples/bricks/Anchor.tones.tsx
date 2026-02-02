/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Anchor } from "@stratakit/bricks";

export default () => {
	return (
		<div className="flex">
			<Anchor tone="accent" href="https://www.example.com/">
				Accent
			</Anchor>
			<Anchor tone="neutral" href="https://www.example.com/">
				Neutral
			</Anchor>
		</div>
	);
};
