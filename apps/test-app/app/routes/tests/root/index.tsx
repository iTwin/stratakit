/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button, Root } from "@itwin/kiwi-react/bricks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export default function Page() {
	const shadow = useShadow(useCallback(() => document.body, []));
	const popout = usePopout();

	return (
		<>
			<h1>Root</h1>

			{shadow &&
				createPortal(
					<Root>
						<Button onClick={() => popout.open()}>Open popout</Button>
					</Root>,
					shadow,
				)}

			{popout.popout &&
				createPortal(
					<Root>
						<Button>Hello</Button>
					</Root>,
					popout.popout.document.body,
				)}
		</>
	);
}

function useShadow(getHost = () => document.body) {
	const [shadow, setShadow] = useState<ShadowRoot | null>(null);

	useEffect(() => {
		const host = getHost();
		if (!host.shadowRoot) {
			host
				.attachShadow({ mode: "open" })
				.appendChild(document.createElement("slot"));
		}
		setShadow(host.shadowRoot);
	}, [getHost]);

	return shadow;
}

function usePopout() {
	const [popout, setPopout] = useState<Window | null>(null);

	const open = useCallback(() => {
		const popout = window.open("", "popout", "width=400,height=400");
		setPopout(popout);
	}, []);

	return useMemo(() => ({ open, popout }), [open, popout]);
}
