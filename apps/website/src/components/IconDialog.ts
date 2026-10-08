/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

/** biome-ignore-all lint/style/noNonNullAssertion: Non-null assertions are used in queries. */

export class IconDialog extends HTMLElement {
	#dialog!: HTMLDialogElement;

	connectedCallback() {
		this.#dialog = this.querySelector("dialog")!;
		const dialogHeading = this.querySelector("h2")!;

		this.#dialog.ariaLabelledByElements = [dialogHeading];

		this.#dialog.addEventListener("click", this.#handleClose);
	}

	#handleClose = (e: PointerEvent) => {
		if (e.target !== e.currentTarget) return;
		this.#dialog.close();
	};

	get dialog() {
		return this.#dialog;
	}

	set title(title: string) {
		const dialogHeading = this.querySelector("h2");
		if (!dialogHeading) return;
		dialogHeading.textContent = title;
	}

	set symbols(args: {
		href: string;
		symbols: string[];
	}) {
		const { href, symbols } = args;

		const template = this.querySelector<HTMLTemplateElement>("[data-symbol]")!;
		const symbolsElement =
			this.querySelector<HTMLUListElement>("[data-symbols]")!;
		symbolsElement.replaceChildren(
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

	set aliases(aliases: string[]) {
		const template = this.querySelector<HTMLTemplateElement>("[data-alias]")!;
		const aliasesElement =
			this.querySelector<HTMLUListElement>("[data-aliases]")!;
		aliasesElement.replaceChildren(
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
