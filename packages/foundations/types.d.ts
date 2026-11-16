/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
declare module "*.css?inline" {
	const content: string;
	export default content;
}

declare const __VERSION__: string;

// https://developer.mozilla.org/en-US/docs/Web/API/Element/setHTML
declare interface HTMLElement {
	setHTML?(
		html: string,
		options?: { sanitizer?: Sanitizer | SanitizerConfig | SanitizerPresets },
	): void;
}
