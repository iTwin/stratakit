/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

declare module "*.svg" {
	const url: string;
	export default url;
}

type CSSModuleClasses = { readonly [key: string]: string };

declare module "*.module.css" {
	const classes: CSSModuleClasses;
	export default classes;
}
