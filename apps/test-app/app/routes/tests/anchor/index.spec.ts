/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { test, expect } from "@playwright/test";

test("default", async ({ page }) => {
	await page.goto("/tests/anchor");

	const anchor = page.getByRole("link");
	const main = page.getByRole("main");

	await expect(anchor).toHaveAccessibleName("Hello");

	await page.keyboard.press("Tab");
	await expect(anchor).toBeFocused();

	// clicking a fragment link moves focus to the target element
	await page.keyboard.press("Enter");
	await expect(main).toBeFocused();
});

test("disabled", async ({ page }) => {
	await page.goto("/tests/anchor?disabled=true");

	const anchor = page.getByRole("link");
	const main = page.getByRole("main");

	await expect(anchor).toBeDisabled();

	await page.keyboard.press("Tab");
	await expect(anchor).toBeFocused();

	// disabled anchor should not navigate
	await page.keyboard.press("Enter");
	await expect(main).not.toBeFocused();
	await anchor.click({ force: true });
	await expect(main).not.toBeFocused();
	await expect(anchor).toBeFocused();
});

test("@visual", async ({ page }) => {
	await page.goto("/tests/anchor?visual=true");
	await expect(page.locator("body")).toHaveScreenshot();
});

test.describe("@a11y", () => {
	// Default Test we want on all components.
	// 1. Keyboard
	test("Anchor is keyboard accessible and responds to Enter key", async ({
		page,
	}) => {
		await page.goto("/tests/anchor");

		// Explicitly focus the anchor instead of using Tab, then check focus and interaction
		const anchor = page.getByRole("link");
		await anchor.focus();
		await expect(anchor).toBeFocused();

		// Test that Enter triggers the navigation behavior
		await page.keyboard.press("Enter");
		const main = page.getByRole("main");
		await expect(main).toBeFocused();
	});

	//2. Accessible Name and Role Verification
	test("Anchor has an accessible name", async ({ page }) => {
		await page.goto("/tests/anchor");

		const anchor = page.getByRole("link", { name: "Hello" });
		await expect(anchor).toHaveAccessibleName("Hello"); // Ensures accessible name is correct
	});

	//3. Color Contrast Compliance
	test("Anchor text color contrast is accessible", async ({ page }) => {
		await page.goto("/tests/anchor");

		const anchor = page.locator("a");
		const color = await anchor.evaluate((node) => getComputedStyle(node).color);
		const backgroundColor = await anchor.evaluate(
			(node) => getComputedStyle(node).backgroundColor,
		);

		function luminance(r: number, g: number, b: number): number {
			const values = [r, g, b].map((value) => {
				const normalized = value / 255;
				return normalized <= 0.03928
					? normalized / 12.92
					: ((normalized + 0.055) / 1.055) ** 2.4;
			});
			return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722;
		}

		function calculateContrast(color1: string, color2: string): number {
			const rgb1 = color1.match(/\d+/g)?.map(Number);
			const rgb2 = color2.match(/\d+/g)?.map(Number);

			if (!rgb1 || !rgb2) {
				throw new Error(
					"Failed to retrieve color values for contrast calculation.",
				);
			}

			const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]) + 0.05;
			const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]) + 0.05;

			return lum1 > lum2 ? lum1 / lum2 : lum2 / lum1;
		}

		if (color && backgroundColor) {
			const contrastRatio = calculateContrast(color, backgroundColor);
			expect(contrastRatio).toBeGreaterThanOrEqual(4.5); // Minimum contrast ratio for normal text
		} else {
			throw new Error("Color or background color is not defined.");
		}
	});

	//4. Screen Reader Compatibility
	test("Anchor announces disabled state to screen readers", async ({
		page,
	}) => {
		await page.goto("/tests/anchor?disabled=true");

		const anchor = page.getByRole("link", { name: "Hello" });
		await expect(anchor).toHaveAttribute("aria-disabled", "true"); // Checks for aria-disabled on the element
	});

	// 5. Responsiveness and Resizing for Visual Accessibility
	test("Anchor is accessible and functional at 200% zoom", async ({ page }) => {
		await page.goto("/tests/anchor");

		await page.setViewportSize({ width: 800, height: 600 }); // Simulate small screen
		await page.evaluate(() => {
			const body = document.body;
			body.style.zoom = "200%"; // Apply 200% zoom
		});

		const anchor = page.getByRole("link", { name: "Hello" });

		// Explicitly set focus on the anchor
		await anchor.focus();
		await expect(anchor).toBeFocused();

		// Test that interaction (Enter key) still works at zoomed level
		await page.keyboard.press("Enter");
		const main = page.getByRole("main");
		await expect(main).toBeFocused();
	});

	test("Ensure accessible name", async ({ page }) => {
		await page.goto("/tests/anchor");

		const anchor = page.getByRole("link");

		await expect(anchor).toHaveAccessibleName("Hello");
	});

	test("Anchor with aria-disabled", async ({ page }) => {
		await page.goto("/tests/anchor?disabled=true");

		const anchor = page.getByRole("link");
		await expect(anchor).toHaveAttribute("aria-disabled", "true");
	});

	test("Anchor without aria-disabled", async ({ page }) => {
		await page.goto("/tests/anchor");

		const anchor = page.getByRole("link");
		await expect(anchor).not.toHaveAttribute("aria-disabled");
	});

	test("Anchor tones have correct attributes", async ({ page }) => {
		await page.goto("/tests/anchor?visual=true");

		const tones = ["neutral", "accent", "critical"];

		for (const tone of tones) {
			// Select the anchor based on the data-kiwi-tone attribute
			const anchor = page.locator(`a[data-kiwi-tone="${tone}"]`);

			// Check if the attribute `data-kiwi-tone` is set correctly
			await expect(anchor).toHaveAttribute("data-kiwi-tone", tone);
		}
	});

	test("Disabled anchor retains focus without action", async ({ page }) => {
		await page.goto("/tests/anchor?disabled=true");

		const anchor = page.getByRole("link");

		await expect(anchor).toBeDisabled();

		await page.keyboard.press("Tab");
		await expect(anchor).toBeFocused();

		await page.keyboard.press("Enter");
		await expect(anchor).toBeFocused();
		await expect(page.url()).toContain("/tests/anchor?disabled=true");
	});
});
