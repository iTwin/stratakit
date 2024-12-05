/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { Button, Root } from "@itwin/kiwi-react/bricks";
import { useCallback, useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

export const handle = { title: "Root" };

export default function Page() {
	const popout = usePopout();

	return (
		<>
			<LightAndShadowButtons />

			<Button onClick={() => popout.open()}>Open popout</Button>

			{popout.popout &&
				createPortal(
					<Root
						style={{
							minBlockSize: "100dvb",
							backgroundColor: "var(--kiwi-color-bg-surface-primary)",
						}}
					>
						<LightAndShadowButtons />
					</Root>,
					popout.popout.document.body,
				)}
		</>
	);
}

// ----------------------------------------------------------------------------

function LightAndShadowButtons() {
	const [host, setHost] = useState<HTMLElement | null>(null);
	const shadow = useShadow(useCallback(() => host, [host]));

	return (
		<div style={{ display: "flex", gap: 4 }} ref={setHost}>
			<Button>Button (light)</Button>
			{shadow &&
				createPortal(
					<Root>
						<Button>Button (shadow)</Button>
					</Root>,
					shadow,
				)}
		</div>
	);
}

// ----------------------------------------------------------------------------

function useShadow(getHost: () => HTMLElement | null) {
	const [shadow, setShadow] = useState<ShadowRoot | null>(null);
	const host = getHost();

	useEffect(() => {
		if (!host) return;
		if (!host.shadowRoot) {
			host
				.attachShadow({ mode: "open" })
				.appendChild(document.createElement("slot"));
		}
		setShadow(host.shadowRoot);
	}, [host]);

	return shadow;
}

// ----------------------------------------------------------------------------

function usePopout() {
	const [popout, setPopout] = useState<Window | null>(null);

	const open = useCallback(() => {
		const popout = window.open("", "popout", "width=400,height=400");
		setPopout(popout);
	}, []);

	return useMemo(() => ({ open, popout }), [open, popout]);
}
