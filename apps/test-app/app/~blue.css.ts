/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const styles = `:is(
		html:where([data-color-scheme="light"]),
		:host([data-color-scheme="light"]),
		.🥝Root:where([data-_sk-theme="light"])
	) {
	--stratakit-color-bg-accent-base: oklch(53.32% 0.139 246.77);
	--stratakit-color-bg-accent-muted: oklch(90.88% 0.04 234.23);
	--stratakit-color-bg-accent-faded: oklch(38.03% 0.093 244.58);
	--stratakit-color-bg-accent-transparent: oklch(53.32% 0.139 246.77 / 0.16);
	--stratakit-color-bg-glow-on-surface-accent-hover: oklch(53.32% 0.139 246.77 / 0.12);
	--stratakit-color-bg-glow-on-surface-accent-pressed: oklch(53.32% 0.139 246.77 / 0.16);
	--stratakit-color-bg-glow-on-surface-accent-active-hover: oklch(53.32% 0.139 246.77 / 0.24);
	--stratakit-color-icon-accent-base: oklch(48.43% 0.124 245.93);
	--stratakit-color-icon-accent-strong: oklch(48.43% 0.124 245.93);
	--stratakit-color-icon-accent-faded: oklch(44.1% 0.104 244.82);
	--stratakit-color-border-accent-base: oklch(53.32% 0.139 246.77);
	--stratakit-color-border-accent-faded: oklch(44.1% 0.104 244.82);
	--stratakit-color-border-accent-muted: oklch(84.62% 0.067 236.36);
	--stratakit-color-border-accent-strong: oklch(48.43% 0.124 245.93);
	--stratakit-color-text-accent-base: oklch(48.43% 0.124 245.93);
	--stratakit-color-text-accent-faded: oklch(44.1% 0.104 244.82);
	--stratakit-color-text-accent-strong: oklch(48.43% 0.124 245.93);
	--stratakit-color-static-accent: oklch(53.32% 0.139 246.77);
	--stratakit-shadow-table-strong: 0px -1px 0px 0px oklch(53.32% 0.139 246.77);
}
@supports not (color: oklch(0% 0 0)) {
	:is(
			html:where([data-color-scheme="light"]),
			:host([data-color-scheme="light"]),
			.🥝Root:where([data-_sk-theme="light"])
		) {
		--stratakit-color-bg-accent-base: #0171b8;
		--stratakit-color-bg-accent-muted: #c8e6f8;
		--stratakit-color-bg-accent-faded: #034670;
		--stratakit-color-bg-accent-transparent: #0171b829;
		--stratakit-color-bg-glow-on-surface-accent-hover: #0171b81f;
		--stratakit-color-bg-glow-on-surface-accent-pressed: #0171b829;
		--stratakit-color-bg-glow-on-surface-accent-active-hover: #0171b83d;
		--stratakit-color-icon-accent-base: #0163a0;
		--stratakit-color-icon-accent-strong: #0163a0;
		--stratakit-color-icon-accent-faded: #0e5788;
		--stratakit-color-border-accent-base: #0171b8;
		--stratakit-color-border-accent-faded: #0e5788;
		--stratakit-color-border-accent-muted: #a3d4f3;
		--stratakit-color-border-accent-strong: #0163a0;
		--stratakit-color-text-accent-base: #0163a0;
		--stratakit-color-text-accent-faded: #0e5788;
		--stratakit-color-text-accent-strong: #0163a0;
		--stratakit-color-static-accent: #0171b8;
		--stratakit-shadow-table-strong: 0px -1px 0px 0px #0171b8;
	}
}
:is(
		html:where([data-color-scheme="dark"]),
		:host([data-color-scheme="dark"]),
		.🥝Root:where([data-_sk-theme="dark"])
	) {
	--stratakit-color-bg-accent-base: oklch(53.32% 0.139 246.77);
	--stratakit-color-bg-accent-muted: oklch(38.03% 0.093 244.58);
	--stratakit-color-bg-accent-faded: oklch(69.98% 0.118 238.51);
	--stratakit-color-bg-accent-transparent: oklch(53.32% 0.139 246.77 / 0.16);
	--stratakit-color-bg-glow-on-surface-accent-hover: oklch(53.32% 0.139 246.77 / 0.12);
	--stratakit-color-bg-glow-on-surface-accent-pressed: oklch(53.32% 0.139 246.77 / 0.16);
	--stratakit-color-bg-glow-on-surface-accent-active-hover: oklch(53.32% 0.139 246.77 / 0.24);
	--stratakit-color-icon-accent-base: oklch(69.98% 0.118 238.51);
	--stratakit-color-icon-accent-strong: oklch(69.98% 0.118 238.51);
	--stratakit-color-icon-accent-faded: oklch(78.73% 0.093 236.98);
	--stratakit-color-border-accent-base: oklch(62.53% 0.14 241.42);
	--stratakit-color-border-accent-faded: oklch(84.62% 0.067 236.36);
	--stratakit-color-border-accent-muted: oklch(44.1% 0.104 244.82);
	--stratakit-color-border-accent-strong: oklch(69.98% 0.118 238.51);
	--stratakit-color-text-accent-base: oklch(69.98% 0.118 238.51);
	--stratakit-color-text-accent-faded: oklch(78.73% 0.093 236.98);
	--stratakit-color-text-accent-strong: oklch(69.98% 0.118 238.51);
	--stratakit-color-static-accent: oklch(53.32% 0.139 246.77);
	--stratakit-shadow-table-strong: 0px -1px 0px 0px oklch(69.98% 0.118 238.51);
}
@supports not (color: oklch(0% 0 0)) {
	:is(
			html:where([data-color-scheme="dark"]),
			:host([data-color-scheme="dark"]),
			.🥝Root:where([data-_sk-theme="dark"])
		) {
		--stratakit-color-bg-accent-base: #0171b8;
		--stratakit-color-bg-accent-muted: #034670;
		--stratakit-color-bg-accent-faded: #4ea8df;
		--stratakit-color-bg-accent-transparent: #0171b829;
		--stratakit-color-bg-glow-on-surface-accent-hover: #0171b81f;
		--stratakit-color-bg-glow-on-surface-accent-pressed: #0171b829;
		--stratakit-color-bg-glow-on-surface-accent-active-hover: #0171b83d;
		--stratakit-color-icon-accent-base: #4ea8df;
		--stratakit-color-icon-accent-strong: #4ea8df;
		--stratakit-color-icon-accent-faded: #7ec3ee;
		--stratakit-color-border-accent-base: #1990d4;
		--stratakit-color-border-accent-faded: #a3d4f3;
		--stratakit-color-border-accent-muted: #0e5788;
		--stratakit-color-border-accent-strong: #4ea8df;
		--stratakit-color-text-accent-base: #4ea8df;
		--stratakit-color-text-accent-faded: #7ec3ee;
		--stratakit-color-text-accent-strong: #4ea8df;
		--stratakit-color-static-accent: #0171b8;
		--stratakit-shadow-table-strong: 0px -1px 0px 0px #4ea8df;
	}
}`;
export default styles;
