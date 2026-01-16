/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import { Button } from "@stratakit/bricks";
import { unstable_Dialog as Dialog } from "@stratakit/structures";

export default () => {
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<Button onClick={() => setOpen(true)}>Go back</Button>
			<Dialog.Root modal={true} open={open} onClose={() => setOpen(false)}>
				<Dialog.Header>
					<Dialog.Heading>Confirm navigation</Dialog.Heading>
					<Dialog.CloseButton />
				</Dialog.Header>
				<Dialog.Content>
					Are you sure you want to leave this page? Changes that you made may
					not be saved.
				</Dialog.Content>
				<Dialog.Footer>
					<Dialog.ActionList
						actions={[
							<Button key="deny" onClick={() => setOpen(false)}>
								Stay on page
							</Button>,
							<Button key="accept" tone="accent" onClick={() => setOpen(false)}>
								Leave page
							</Button>,
						]}
					/>
				</Dialog.Footer>
			</Dialog.Root>
		</>
	);
};
