/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { readFileSync, writeFileSync } from "node:fs";

import fg from "fast-glob";

let pattern: string | string[] = process.argv
	.slice(2)
	.flatMap((x) => (x !== "--fix" ? x.replaceAll("\\", "/") : []));

// if no pattern is specified, then lint everything
if (pattern.length === 0) {
	pattern = "**/*.{ts,tsx,js,jsx,css,html}";
}

const filePaths = fg.sync(pattern, {
	dot: true,
	ignore: [
		"**/node_modules/**/*",
		"**/build/**/*",
		"**/dist/**/*",
		"**/minimal-template/**/*",
	],
});

const copyrightLine1 =
	"Copyright (c) Bentley Systems, Incorporated. All rights reserved.";
const copyrightLine2 =
	"See LICENSE.md in the project root for license terms and full copyright notice.";

const copyrightBannerScss = `// ${copyrightLine1}\n// ${copyrightLine2}`;
const copyrightBannerHtml = `<!--\n  ${copyrightLine1}\n  ${copyrightLine2}\n-->`;
const copyrightBannerJs = `/*---------------------------------------------------------------------------------------------
 * ${copyrightLine1}
 * ${copyrightLine2}
 *--------------------------------------------------------------------------------------------*/`;

for (const filePath of filePaths) {
	const fileContent = readFileSync(filePath, { encoding: "utf8" });
	if (
		!fileContent.includes(copyrightLine1) &&
		!fileContent.includes(copyrightLine2)
	) {
		if (process.argv.includes("--fix")) {
			switch (filePath.substring(filePath.lastIndexOf("."))) {
				case ".js":
				case ".ts":
				case ".tsx":
				case ".css":
					if (fileContent.startsWith("@charset")) {
						// @charset must be the first line in the file so insert the copyright banner after it
						writeFileSync(
							filePath,
							fileContent.replace(
								'@charset "UTF-8";',
								`@charset "UTF-8";\n${copyrightBannerJs}`,
							),
						);
					} else {
						writeFileSync(filePath, `${copyrightBannerJs}\n${fileContent}`);
					}
					break;
				case ".html":
					writeFileSync(filePath, `${copyrightBannerHtml}\n${fileContent}`);
					break;
				case ".scss":
					writeFileSync(filePath, `${copyrightBannerScss}\n${fileContent}`);
					break;
			}
		} else {
			process.exitCode = 1;
			console.log(`copyright-linter.ts failed at ${filePath}`);
		}
	}
}

export { copyrightBannerScss, copyrightBannerHtml, copyrightBannerJs };
