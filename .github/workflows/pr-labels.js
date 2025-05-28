/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
export default async function prLabels() {
	const owner = context.repo.owner;
	const repo = context.repo.repo;
	const pr = context.payload.pull_request;

	const prNumber = pr.number;

	const labelsToAdd = new Set();

	const LABELS = {
		ACCORDION: "component: Accordion",
		ANCHOR: "component: Anchor",
		AVATAR: "component: Avatar",
		BADGE: "component: Badge",
		BANNER: "component: Banner",
		BREADCRUMB: "component: Breadcrumb",
		BUTTON: "component: Button",
		CARD: "component: Card",
		CHECKBOX: "component: Checkbox",
		CHIP: "component: Chip",
		CODE_SNIPPET: "component: CodeSnippet",
		DESCRIPTION: "component: Description",
		DIALOG: "component: Dialog",
		DIVIDER: "component: Divider",
		DROPDOWN_MENU: "component: DropdownMenu",
		ERROR_REGION: "component: ErrorRegion",
		FIELD: "component: Field",
		ICON: "component: Icon",
		ICON_BUTTON: "component: IconButton",
		KBD: "component: Kbd",
		LABEL: "component: Label",
		LIST: "component: List",
		PAGINATION: "component: Pagination",
		PLATFORM_BAR: "component: PlatformBar",
		POPOVER: "component: Popover",
		PROGRESS_BAR: "component: ProgressBar",
		RADIO: "component: Radio",
		SELECT: "component: Select",
		SKELETON: "component: Skeleton",
		SPINNER: "component: Spinner",
		SWITCH: "component: Switch",
		TABLE: "component: Table",
		TABS: "component: Tabs",
		TEXT: "component: Text",
		TEXT_BOX: "component: TextBox",
		TOAST: "component: Toast",
		TOOLBAR: "component: Toolbar",
		TOOLTIP: "component: Tooltip",
		TREE: "component: Tree",
		API_BRIDGE: "API bridge",
		GITHUB_ACTIONS: "github_actions",
	};

	const LABEL_MAP = {
		[LABELS.ACCORDION]: [
			"packages/structures/src/AccordionItem.tsx",
			"packages/structures/src/AccordionItem.css",
			"apps/test-app/app/tests/accordion-item/",
		],
		[LABELS.ANCHOR]: [
			"packages/bricks/src/Anchor.tsx",
			"packages/bricks/src/Anchor.css",
			"apps/test-app/app/tests/anchor/",
			"packages/compat/src/Anchor.tsx",
		],
		[LABELS.AVATAR]: [
			"packages/bricks/src/Avatar.tsx",
			"packages/bricks/src/Avatar.css",
			"apps/test-app/app/tests/avatar/",
		],
		[LABELS.BADGE]: [
			"packages/bricks/src/Badge.tsx",
			"packages/bricks/src/Badge.css",
			"apps/test-app/app/tests/badge/",
		],
		[LABELS.BANNER]: [
			"packages/structures/src/Banner.tsx",
			"packages/structures/src/Banner.css",
			"apps/test-app/app/tests/banner/",
		],
		[LABELS.BREADCRUMB]: [],
		[LABELS.BUTTON]: [
			"packages/bricks/src/Button.tsx",
			"packages/bricks/src/Button.css",
			"apps/test-app/app/tests/button/",
		],
		[LABELS.CARD]: [],
		[LABELS.CHECKBOX]: [
			"packages/bricks/src/Checkbox.tsx",
			"packages/bricks/src/Checkbox.css",
			"apps/test-app/app/tests/checkbox/",
		],
		[LABELS.CHIP]: [
			"packages/structures/src/Chip.tsx",
			"packages/structures/src/Chip.css",
			"apps/test-app/app/tests/chip/",
		],
		[LABELS.CODE_SNIPPET]: [],
		[LABELS.DESCRIPTION]: [
			"packages/bricks/src/Description.tsx",
			"packages/bricks/src/Description.css",
		],
		[LABELS.DIALOG]: [],
		[LABELS.DIVIDER]: [
			"packages/bricks/src/Divider.tsx",
			"packages/bricks/src/Divider.css",
			"apps/test-app/app/tests/divider/",
			"packages/compat/src/Divider.tsx",
		],
		[LABELS.DROPDOWN_MENU]: [
			"packages/structures/src/DropdownMenu.tsx",
			"packages/structures/src/DropdownMenu.css",
			"packages/compat/src/MenuItem.tsx",
			"apps/test-app/app/tests/dropdown-menu/",
		],
		[LABELS.ERROR_REGION]: [
			"packages/structures/src/ErrorRegion.tsx",
			"packages/structures/src/ErrorRegion.css",
			"apps/test-app/app/tests/error-region/",
		],
		[LABELS.FIELD]: [
			"packages/bricks/src/Field.tsx",
			"packages/bricks/src/Field.css",
			"packages/bricks/src/Field.internal.tsx",
			"apps/test-app/app/tests/field/",
		],
		[LABELS.ICON]: ["apps/test-app/app/tests/icon/"],
		[LABELS.ICON_BUTTON]: [
			"packages/bricks/src/IconButton.tsx",
			"packages/bricks/src/IconButton.css",
			"packages/bricks/src/IconButton.internal.tsx",
			"apps/test-app/app/tests/icon-button/",
		],
		[LABELS.KBD]: [
			"packages/bricks/src/Kbd.tsx",
			"packages/bricks/src/Kbd.css",
			"packages/bricks/src/Kbd.internal.ts",
			"apps/test-app/app/tests/kbd/",
			"packages/compat/src/Kbd.tsx",
		],
		[LABELS.LABEL]: [
			"packages/bricks/src/Label.tsx",
			"packages/bricks/src/Label.css",
			"packages/compat/src/Label.tsx",
		],
		[LABELS.LIST]: ["apps/test-app/app/tests/list/"],
		[LABELS.PAGINATION]: [],
		[LABELS.PLATFORM_BAR]: [],
		[LABELS.POPOVER]: [],
		[LABELS.PROGRESS_BAR]: [
			"packages/bricks/src/ProgressBar.tsx",
			"packages/bricks/src/ProgressBar.css",
			"packages/compat/src/ProgressLinear.tsx",
			"apps/test-app/app/tests/progress-bar/",
		],
		[LABELS.RADIO]: [
			"packages/bricks/src/Radio.tsx",
			"packages/bricks/src/Radio.css",
			"apps/test-app/app/tests/radio/",
		],
		[LABELS.SELECT]: [
			"packages/bricks/src/Select.tsx",
			"packages/bricks/src/Select.css",
			"apps/test-app/app/tests/select/",
		],
		[LABELS.SKELETON]: [
			"packages/bricks/src/Skeleton.tsx",
			"packages/bricks/src/Skeleton.css",
			"apps/test-app/app/tests/skeleton/",
		],
		[LABELS.SPINNER]: [
			"packages/bricks/src/Spinner.tsx",
			"packages/bricks/src/Spinner.css",
			"apps/test-app/app/tests/spinner/",
		],
		[LABELS.SWITCH]: [
			"packages/bricks/src/Switch.tsx",
			"packages/bricks/src/Switch.css",
			"apps/test-app/app/tests/switch/",
		],
		[LABELS.TABLE]: [
			"packages/structures/src/Table.tsx",
			"packages/structures/src/Table.css",
			"apps/test-app/app/tests/table/",
		],
		[LABELS.TABS]: [
			"packages/structures/src/Tabs.tsx",
			"packages/structures/src/Tabs.css",
			"apps/test-app/app/tests/tabs/",
		],
		[LABELS.TEXT]: [
			"packages/bricks/src/Text.tsx",
			"packages/bricks/src/Text.css",
			"apps/test-app/app/tests/text/",
			"packages/compat/src/Text.tsx",
		],
		[LABELS.TEXT_BOX]: [
			"packages/bricks/src/TextBox.tsx",
			"packages/bricks/src/TextBox.css",
			"apps/test-app/app/tests/text-box/",
		],
		[LABELS.TOAST]: [],
		[LABELS.TOOLBAR]: [
			"packages/structures/src/Toolbar.tsx",
			"packages/structures/src/Toolbar.css",
			"apps/test-app/app/tests/toolbar/",
		],
		[LABELS.TOOLTIP]: [
			"packages/bricks/src/Tooltip.tsx",
			"packages/bricks/src/Tooltip.css",
			"apps/test-app/app/tests/tooltip/",
			"packages/compat/src/Tooltip.tsx",
		],
		[LABELS.TREE]: [
			"packages/structures/src/Tree.tsx",
			"packages/structures/src/Tree.css",
			"packages/compat/src/TreeItem.tsx",
			"packages/compat/src/TreeItem.css",
			"apps/test-app/app/tests/tree/",
		],
		[LABELS.API_BRIDGE]: ["packages/compat/"],
		[LABELS.GITHUB_ACTIONS]: [".github/"],
	};

	try {
		// get files changed
		const files = await github.paginate(github.rest.pulls.listFiles, {
			owner: owner,
			repo: repo,
			pull_number: prNumber,
		});

		// determine labels based on files changed
		for (const file of files) {
			const fileName = file.filename;

			for (const [label, paths] of Object.entries(LABEL_MAP)) {
				// check that the current changed file is part of any accepted path for the label
				if (paths.some((path) => fileName.startsWith(path))) {
					labelsToAdd.add(label);
				}
			}
		}

		// if synchronizing, remove any outdated labels
		const currentLabels = await github.rest.issues.listLabelsOnIssue({
			owner: owner,
			repo: repo,
			issue_number: prNumber,
		});
		const currentLabelNames = new Set(
			currentLabels.data.map((label) => label.name),
		);

		const finalLabelsAdd = [...labelsToAdd].filter(
			(label) => !currentLabelNames.has(label),
		);
		const finalLabelsRemove = [...currentLabelNames].filter(
			(label) => !labelsToAdd.has(label),
		);

		// remove irrelevant labels from the PR
		for (const label of finalLabelsRemove) {
			await github.rest.issues.removeLabel({
				owner: owner,
				repo: repo,
				issue_number: prNumber,
				name: label,
			});
		}

		// add relevant labels to the PR
		if (finalLabelsAdd.length > 0) {
			await github.rest.issues.addLabels({
				owner: owner,
				repo: repo,
				issue_number: prNumber,
				labels: finalLabelsAdd,
			});
		}
	} catch (error) {
		console.log("Failed assigning labels");
		console.error(error);
	}
}
