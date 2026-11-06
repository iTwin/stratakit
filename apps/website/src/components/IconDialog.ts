/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
/** biome-ignore-all lint/style/noNonNullAssertion: Non-null assertions are used in queries. */

import iconsMeta from "@stratakit/icons/icons-meta.json";

export class IconDialog extends HTMLElement {
	#dialog!: HTMLDialogElement;
	#dialogHeading!: HTMLHeadingElement;
	#symbols!: IconSymbols;
	#aliases!: IconAliases;

	#iconName = "placeholder";

	connectedCallback() {
		this.#dialog = this.querySelector("dialog")!;
		this.#dialogHeading = this.querySelector("h2")!;

		this.#dialog.ariaLabelledByElements = [this.#dialogHeading];

		this.#dialog.addEventListener("click", this.#handleClick);

		const dismissButton =
			this.querySelector<HTMLButtonElement>(".header button")!;
		dismissButton.addEventListener("click", this.#handleDismissClick);

		this.#symbols = this.querySelector("icon-symbols")!;
		this.#aliases = this.querySelector("icon-aliases")!;
	}

	#handleClick = (e: PointerEvent) => {
		if (e.target !== e.currentTarget) return;
		this.#dialog.close();
	};

	#handleDismissClick = () => {
		this.#dialog.close();
	};

	get dialog() {
		return this.#dialog;
	}

	get iconName() {
		return this.#iconName;
	}

	renderIcon(args: { iconName: string; href: string }) {
		const { iconName, href } = args;

		const iconMeta = iconsMeta[iconName as keyof typeof iconsMeta];
		if (!iconMeta) return;

		this.#iconName = iconName;
		const headingIconName =
			this.#dialogHeading.querySelector("[data-icon-name]");
		if (headingIconName) headingIconName.textContent = `${iconName}.svg`;

		const { aliases, symbols } = iconMeta;
		this.#aliases.renderAliases({ aliases });
		this.#symbols.renderSymbols({
			href,
			symbols,
		});
	}
}

export class IconSymbols extends HTMLElement {
	renderSymbols(args: { symbols: string[]; href: string }) {
		const { symbols, href } = args;

		const template = this.querySelector<HTMLTemplateElement>("template")!;
		const list = this.querySelector<HTMLUListElement>("ul")!;
		list.replaceChildren(
			...symbols.map((symbol) => {
				const symbolItem = template.content.cloneNode(true) as DocumentFragment;

				const size = getSize(symbol);
				const svg = symbolItem.querySelector("svg")!;
				svg.dataset.size = size;

				const use = svg.querySelector<SVGUseElement>("use")!;
				use.setAttribute("href", `${href}#${symbol}`);

				symbolItem.querySelector("span")!.textContent = symbol;
				return symbolItem;
			}),
		);
	}
}

export class IconAliases extends HTMLElement {
	renderAliases({ aliases }: { aliases: string[] }) {
		const template = this.querySelector<HTMLTemplateElement>("template")!;
		const list = this.querySelector<HTMLUListElement>("ul")!;
		list.replaceChildren(
			...aliases.map((alias) => {
				const aliasItem = template.content.cloneNode(true) as DocumentFragment;
				aliasItem.querySelector("li")!.textContent = alias;
				return aliasItem;
			}),
		);
	}
}

function getSize(symbol: string) {
	return symbol.includes("-large") ? "large" : "regular";
}
