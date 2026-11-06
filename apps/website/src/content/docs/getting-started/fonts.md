---
title: Fonts
description: Self-host the fonts used by StrataKit.
---

StrataKit uses the following fonts:

- [Inter](https://rsms.me/inter/) as the primary interface font for most text on the page, including headings.
- [IBM Plex Mono](https://github.com/IBM/plex/tree/master/packages/plex-mono-variable) as the monospace font (e.g. for code snippets).

We recommend self-hosting all fonts for better performance, reliability, and security.

:::caution[Avoid third-party sources]
We recommend downloading the font files from the official sources linked below. Third-party sources, such as Google Fonts or Fontsource, may use different `font-family` names or even serve a different version of the font altogether, which can result in visual differences.

StrataKit only references the exact `font-family` names listed below, so the `@font-face` rules _must_ use these names.
:::

## Inter

StrataKit uses the variable version of [Inter](https://rsms.me/inter/), referenced by the font-family name `InterVariable` in the `--stratakit-font-family-sans` CSS variable.

To self-host `InterVariable`, download the [`InterVariable.woff2`](https://rsms.me/inter/font-files/InterVariable.woff2) and [`InterVariable-Italic.woff2`](https://rsms.me/inter/font-files/InterVariable-Italic.woff2) font files from the [official website](https://rsms.me/inter/), and serve them alongside your other assets. Then include the following CSS in the `<head>` of your document, replacing the placeholder paths with the correct path to where the fonts are located:

```html
<style>
	@font-face {
		font-family: InterVariable;
		font-style: normal;
		font-weight: 100 900;
		font-display: swap;
		src: url("/path/to/InterVariable.woff2") format("woff2");
	}
	@font-face {
		font-family: InterVariable;
		font-style: italic;
		font-weight: 100 900;
		font-display: swap;
		src: url("/path/to/InterVariable-Italic.woff2") format("woff2");
	}
</style>
```

:::note
If the `InterVariable` font-face is not available on the page, the [`Root`](/components/root/) component will automatically load it from [Inter's official CDN](https://rsms.me/inter/#faq-cdn) as a fallback. This results in an external request, which could get blocked by security policies. Self-hosting avoids any such potential issues.
:::

## IBM Plex Mono (optional)

StrataKit uses the variable version of [IBM Plex Mono](https://github.com/IBM/plex/tree/master/packages/plex-mono-variable), referenced by the font-family name `IBM Plex Mono Var` in the `--stratakit-font-family-mono` CSS variable.

To self-host `IBM Plex Mono Var`, download the [`IBM Plex Mono Var-Roman.woff2`](https://github.com/IBM/plex/blob/master/packages/plex-mono-variable/fonts/complete/woff2/IBM%20Plex%20Mono%20Var-Roman.woff2) and [`IBM Plex Mono Var-Italic.woff2`](https://github.com/IBM/plex/blob/master/packages/plex-mono-variable/fonts/complete/woff2/IBM%20Plex%20Mono%20Var-Italic.woff2) font files from the [official repository](https://github.com/IBM/plex/tree/master/packages/plex-mono-variable/fonts/complete/woff2), and serve them alongside your other assets. Then include the following CSS in the `<head>` of your document, replacing the placeholder paths with the correct path to where the fonts are located:

```html
<style>
	@font-face {
		font-family: "IBM Plex Mono Var";
		font-style: normal;
		font-weight: 100 700;
		font-display: swap;
		src: url("/path/to/IBM Plex Mono Var-Roman.woff2") format("woff2");
	}
	@font-face {
		font-family: "IBM Plex Mono Var";
		font-style: italic;
		font-weight: 100 700;
		font-display: swap;
		src: url("/path/to/IBM Plex Mono Var-Italic.woff2") format("woff2");
	}
</style>
```

:::note
`IBM Plex Mono Var` is _not_ loaded automatically. If it is not available on the page, StrataKit falls back to other monospace fonts installed on the user's system.
:::

## Preloading

Normally, the browser requests a font file only after it finds text on the page that uses the font. If the text is rendered before the font finishes downloading, this can result in a brief [flash of unstyled text (FOUT)](https://web.dev/articles/preload-optional-fonts).

To start the download earlier, add a [preload link](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload) for `InterVariable.woff2` to the `<head>` of your document. The `href` value must match the URL in the `@font-face` rule exactly.

```html
<link rel="preload" href="/path/to/InterVariable.woff2" as="font" type="font/woff2" crossorigin />
```

The [`crossorigin`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/crossorigin) attribute is [required](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/preload#cors-enabled_fetches), even when the font file is served on the same origin.

:::tip
Preload only the font files that are considered critical. Most StrataKit elements rely only on `InterVariable.woff2`, so it is usually the only font file that needs preloading.
:::

## Bundling

[Vite](https://vite.dev/guide/assets.html#importing-asset-as-url) and other build tools can handle `url()` references and automatically copy these font files into your output directory with hashed file names. These files can then be safely served with [HTTP caching](https://developer.chrome.com/docs/lighthouse/performance/uses-long-cache-ttl/#how_to_cache_static_resources_using_http_caching) without blocking upgrades to newer versions of the fonts.

The [preload link](#preloading) and the `@font-face` rule must use the same hashed URL. (Vite automatically rewrites preload links in `index.html` too.)
