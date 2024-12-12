/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Root } from "@itwin/itwinui-react/bricks";
import { definePage, useColorScheme } from "~/~utils.tsx";

export const handle = { title: "Root", rootTest: true };

export default definePage(function Page({ synchronizeColorScheme = true }) {
	const popout = usePopout();
	const colorScheme = useColorScheme();

	return (
		<Root
			colorScheme={colorScheme}
			synchronizeColorScheme={!!synchronizeColorScheme}
			density="dense"
		>
			<LightAndShadowButtons />

			<Button onClick={() => popout.open()}>Open popout</Button>

			{popout.popout &&
				ReactDOM.createPortal(
					<Root
						colorScheme={colorScheme}
						synchronizeColorScheme
						density="dense"
					>
						<LightAndShadowButtons />
					</Root>,
					popout.popout.document.body,
				)}
		</Root>
	);
});

// ----------------------------------------------------------------------------

function LightAndShadowButtons() {
	const [host, setHost] = React.useState<HTMLElement | null>(null);
	const shadow = useShadow(React.useCallback(() => host, [host]));
	const colorScheme = useColorScheme();

	return (
		<div style={{ display: "flex", gap: 4 }} ref={setHost}>
			<Button>Button (light)</Button>
			{shadow &&
				ReactDOM.createPortal(
					<Root colorScheme={colorScheme} density="dense">
						<Button>Button (shadow)</Button>
					</Root>,
					shadow,
				)}
		</div>
	);
}

// ----------------------------------------------------------------------------

function useShadow(getHost: () => HTMLElement | null) {
	const [shadow, setShadow] = React.useState<ShadowRoot | null>(null);
	const host = getHost();

	React.useEffect(() => {
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
	const [popout, setPopout] = React.useState<Window | null>(null);

	const open = React.useCallback(() => {
		// We need to open a document since otherwise it opens in Quirks mode
		const popout = window.open("popout.html", "popout", "width=400,height=400");
		if (!popout) return;
		// Wait for it to load before modifying
		popout.onload = () => setPopout(popout);
	}, []);

	return React.useMemo(() => ({ open, popout }), [open, popout]);
}
