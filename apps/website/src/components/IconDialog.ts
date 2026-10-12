/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** biome-ignore-all lint/style/noNonNullAssertion: Non-null assertions are used in queries. */

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

		this.#dialog.addEventListener("click", this.#handleClose);

		this.#symbols = this.querySelector("icon-symbols")!;
		this.#aliases = this.querySelector("icon-aliases")!;
	}

	#handleClose = (e: PointerEvent) => {
		if (e.target !== e.currentTarget) return;
		this.#dialog.close();
	};

	get dialog() {
		return this.#dialog;
	}

	get symbolsElement() {
		return this.#symbols;
	}

	get aliasesElement() {
		return this.#aliases;
	}

	get iconName() {
		return this.#iconName;
	}

	set iconName(iconName: string) {
		this.#iconName = iconName;
		this.#dialogHeading.textContent = `Icon: ${iconName}.svg`;
	}
}

export class IconSymbols extends HTMLElement {
	set symbols(args: { href: string; symbols: string[] }) {
		const { href, symbols } = args;

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
	set aliases(aliases: string[]) {
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
