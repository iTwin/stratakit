/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Button, Root, DropdownMenu } from "@itwin/itwinui-react/bricks";
import { definePage, useColorScheme } from "~/~utils.tsx";

export const handle = { title: "Root", rootTest: true };

export default definePage(
	function Page({ synchronizeColorScheme = true }) {
		const popout = usePopout();
		const colorScheme = useColorScheme();

		return (
			<Root
				colorScheme={colorScheme}
				synchronizeColorScheme={!!synchronizeColorScheme}
				density="dense"
			>
				<LightAndShadowComponents />

				<Button onClick={() => popout.open()}>Open popout</Button>

				{popout.popout &&
					ReactDOM.createPortal(
						<Root
							colorScheme={colorScheme}
							synchronizeColorScheme
							density="dense"
						>
							<LightAndShadowComponents />
						</Root>,
						popout.popout.document.body,
					)}
			</Root>
		);
	},
	{ _conditionalRendering: ConditionalRenderingTest },
);

// ----------------------------------------------------------------------------

function LightAndShadowComponents() {
	const [host, setHost] = React.useState<HTMLElement | null>(null);
	const shadow = useShadow(React.useCallback(() => host, [host]));
	const colorScheme = useColorScheme();

	return (
		<div style={{ display: "flex", gap: 4, flexWrap: "wrap" }} ref={setHost}>
			<Button>Button (light)</Button>
			<DropdownMenu.Root>
				<DropdownMenu.Button>Menu (light)</DropdownMenu.Button>

				<DropdownMenu.Content>
					<DropdownMenu.Item label="Item 1" />
					<DropdownMenu.Item label="Item 2" />
				</DropdownMenu.Content>
			</DropdownMenu.Root>

			{shadow &&
				ReactDOM.createPortal(
					<Root
						colorScheme={colorScheme}
						density="dense"
						style={{ display: "flex", gap: 4 }}
					>
						<Button>Button (shadow)</Button>

						<DropdownMenu.Root>
							<DropdownMenu.Button>Menu (shadow)</DropdownMenu.Button>

							<DropdownMenu.Content>
								<DropdownMenu.Item label="Item 1" />
								<DropdownMenu.Item label="Item 2" />
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Root>,
					shadow,
				)}
		</div>
	);
}

// ----------------------------------------------------------------------------

function ConditionalRenderingTest() {
	const [host, setHost] = React.useState<HTMLElement | null>(null);
	const [shouldRenderRoot, setShouldRenderRoot] = React.useState(true);
	const shadow = useShadow(React.useCallback(() => host, [host]));

	const button = (
		<Button onClick={() => setShouldRenderRoot(!shouldRenderRoot)}>
			Toggle Root
		</Button>
	);

	return (
		<div ref={setHost}>
			{shadow
				? ReactDOM.createPortal(
						shouldRenderRoot ? (
							<Root colorScheme="dark" density="dense">
								{button}
							</Root>
						) : (
							button
						),
						shadow,
					)
				: null}
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
		// Create an object URL from a blob of an HTML document with the correct
		// doctype and charset
		const bytes = new TextEncoder().encode(
			"<!doctype html><meta charset=utf-8>",
		);
		const url = URL.createObjectURL(new Blob([bytes], { type: "text/html" }));

		// We need to open a document since otherwise it opens in Quirks mode
		const popout = window.open(url, "popout", "width=400,height=400");
		URL.revokeObjectURL(url);

		if (!popout) return;
		// Wait for it to load before modifying
		popout.onload = () => setPopout(popout);
	}, []);

	return React.useMemo(() => ({ open, popout }), [open, popout]);
}
