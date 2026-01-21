/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Chip } from "@stratakit/structures";

export default () => {
	return (
		<div className="flex">
			<Chip onDismiss={() => {}} label="sort:updated-desc" />
			<Chip onDismiss={() => {}} label="is:pr" />
			<Chip onDismiss={() => {}} label="is:open" />
		</div>
	);
};
