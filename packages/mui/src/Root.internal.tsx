/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { isDocument } from "@stratakit/internal-utils/dom";

import type { StylisElement } from "@emotion/cache";

// ----------------------------------------------------------------------------

interface StyledEngineProviderProps extends React.PropsWithChildren {
	rootNode?: Node;
}

/** This is similar to MUI's `StyledEngineProvider` but with a custom Emotion cache. */
export function StyledEngineProvider(props: StyledEngineProviderProps) {
	const { children, rootNode } = props;

	const container = isDocument(rootNode) ? rootNode.head : rootNode;
	const cache = React.useMemo(
		() => createEmotionCache({ container }),
		[container],
	);

	return <CacheProvider value={cache}>{children}</CacheProvider>;
}

// ----------------------------------------------------------------------------

function createEmotionCache({ container }: { container?: Node }) {
	const cache = createCache({
		key: "mui",
		speedy: true, // This injects styles using the `insertRule` API.
		stylisPlugins: [prefixer],
		container,
	});

	// Reimplementing MUI's `enableCssLayer` prop, which wraps all styles in `@layer mui`. https://github.com/mui/material-ui/blob/5cac916e20b9b27056cff9ba76ab0a99f351ef1c/packages/mui-styled-engine/src/StyledEngineProvider/StyledEngineProvider.js#L87-L96
	// MIT License: https://github.com/mui/material-ui/blob/5cac916e20b9b27056cff9ba76ab0a99f351ef1c/LICENSE
	const prevInsert = cache.insert;
	cache.insert = (...args) => {
		if (!args[1].styles.match(/^@layer\s+[^{]*$/)) {
			args[1].styles = `@layer mui {${args[1].styles}}`;
		}
		return prevInsert(...args);
	};

	return cache;
}

// ----------------------------------------------------------------------------

// This is a trimmed down version of the stylis prefixer, which will be used in the next major version of Emotion.
// Adapted from `@emotion/cache` with stylis imports inlined. https://github.com/emotion-js/emotion/blob/49108c893d50fe95dca1f4b13390dd1ede80c57e/packages/cache/src/prefixer.ts
// MIT License: https://github.com/emotion-js/emotion/blob/49108c893d50fe95dca1f4b13390dd1ede80c57e/packages/cache/LICENSE

function prefixer(element: StylisElement) {
	if (element.length > -1 && !element.return && element.type === "decl") {
		element.return = prefix(element.value, element.length);
	}
}
function prefix(value: string, length: number): string {
	switch (hash(value, length)) {
		// color-adjust
		case 5103:
			return `-webkit-print-${value}${value}`;
		// box-decoration-break
		case 3005:
		// mask, mask-image, mask-(mode|clip|size), mask-(repeat|origin), mask-position, mask-composite,
		case 6391:
		case 5879:
		case 5623:
		case 6135:
		case 4599:
		case 4855:
		// user-select, hyphens, text-size-adjust
		case 4246:
		case 6968:
		case 2756:
			return `-webkit-${value}${value}`;
	}
	return value;
}

// From stylis. https://github.com/thysultan/stylis/blob/2e3828995507e1b68e01c21ee9f35501a48355f0/src/Utility.js#L24-L26
// MIT License: https://github.com/thysultan/stylis/blob/2e3828995507e1b68e01c21ee9f35501a48355f0/LICENSE
function hash(value: string, length: number) {
	return (value.charCodeAt(0) | 0) ^ 45
		? (((((((length << 2) ^ (value.charCodeAt(0) | 0)) << 2) ^
				(value.charCodeAt(1) | 0)) <<
				2) ^
				(value.charCodeAt(2) | 0)) <<
				2) ^
				(value.charCodeAt(3) | 0)
		: 0;
}

// ----------------------------------------------------------------------------
