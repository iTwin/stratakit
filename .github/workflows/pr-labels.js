/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
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

export default async function prLabels(context, github) {
	const repo = context.repo.repo;
	const owner = context.repo.owner;
	const pr = context.payload.pull_request;
	const prNumber = pr.number;

	const labelsToAdd = new Set();

	const LABEL_MAP = {
		[LABELS.ACCORDION]: [
			"packages/structures/src/AccordionItem",
			// "packages/structures/src/AccordionItem.css",
		],
		[LABELS.ANCHOR]: [
			"packages/bricks/src/Anchor",
			// "packages/bricks/src/Anchor.css",
			"packages/compat/src/Anchor.tsx",
		],
		[LABELS.AVATAR]: [
			"packages/bricks/src/Avatar",
			// "packages/bricks/src/Avatar.css",
		],
		[LABELS.BADGE]: [
			"packages/bricks/src/Badge",
			// "packages/bricks/src/Badge.css",
		],
		[LABELS.BANNER]: [
			"packages/structures/src/Banner",
			// "packages/structures/src/Banner.css",
		],
		[LABELS.BREADCRUMB]: [],
		[LABELS.BUTTON]: [
			"packages/bricks/src/Button",
			// "packages/bricks/src/Button.css",
		],
		[LABELS.CARD]: [],
		[LABELS.CHECKBOX]: [
			"packages/bricks/src/Checkbox",
			// "packages/bricks/src/Checkbox.css",
		],
		[LABELS.CHIP]: [
			"packages/structures/src/Chip",
			// "packages/structures/src/Chip.css",
		],
		[LABELS.CODE_SNIPPET]: [],
		[LABELS.DESCRIPTION]: [
			"packages/bricks/src/Description",
			// "packages/bricks/src/Description.css",
		],
		[LABELS.DIALOG]: [],
		[LABELS.DIVIDER]: [
			"packages/bricks/src/Divider",
			// "packages/bricks/src/Divider.css",
			"packages/compat/src/Divider.tsx",
		],
		[LABELS.DROPDOWN_MENU]: [
			"packages/structures/src/DropdownMenu",
			// "packages/structures/src/DropdownMenu.css",
			"packages/compat/src/MenuItem.tsx",
		],
		[LABELS.ERROR_REGION]: [
			"packages/structures/src/ErrorRegion",
			// "packages/structures/src/ErrorRegion.css",
		],
		[LABELS.FIELD]: [
			"packages/bricks/src/Field",
			// "packages/bricks/src/Field.css",
			// "packages/bricks/src/Field.internal.tsx",
		],
		[LABELS.ICON]: [],
		[LABELS.ICON_BUTTON]: [
			"packages/bricks/src/IconButton",
			// "packages/bricks/src/IconButton.css",
			// "packages/bricks/src/IconButton.internal.tsx",
		],
		[LABELS.KBD]: [
			"packages/bricks/src/Kbd",
			// "packages/bricks/src/Kbd.css",
			// "packages/bricks/src/Kbd.internal.ts",
			"packages/compat/src/Kbd.tsx",
		],
		[LABELS.LABEL]: [
			"packages/bricks/src/Label",
			// "packages/bricks/src/Label.css",
			"packages/compat/src/Label.tsx",
		],
		[LABELS.LIST]: [],
		[LABELS.PAGINATION]: [],
		[LABELS.PLATFORM_BAR]: [],
		[LABELS.POPOVER]: [],
		[LABELS.PROGRESS_BAR]: [
			"packages/bricks/src/ProgressBar",
			// "packages/bricks/src/ProgressBar.css",
			"packages/compat/src/ProgressLinear.tsx",
		],
		[LABELS.RADIO]: [
			"packages/bricks/src/Radio",
			// "packages/bricks/src/Radio.css",
		],
		[LABELS.SELECT]: [
			"packages/bricks/src/Select",
			// "packages/bricks/src/Select.css",
		],
		[LABELS.SKELETON]: [
			"packages/bricks/src/Skeleton",
			// "packages/bricks/src/Skeleton.css",
		],
		[LABELS.SPINNER]: [
			"packages/bricks/src/Spinner",
			// "packages/bricks/src/Spinner.css",
		],
		[LABELS.SWITCH]: [
			"packages/bricks/src/Switch",
			// "packages/bricks/src/Switch.css",
		],
		[LABELS.TABLE]: [
			"packages/structures/src/Table",
			// "packages/structures/src/Table.css",
		],
		[LABELS.TABS]: [
			"packages/structures/src/Tabs",
			// "packages/structures/src/Tabs.css",
		],
		[LABELS.TEXT]: [
			"packages/bricks/src/Text",
			// "packages/bricks/src/Text.css",
			"packages/compat/src/Text.tsx",
		],
		[LABELS.TEXT_BOX]: [
			"packages/bricks/src/TextBox",
			// "packages/bricks/src/TextBox.css",
		],
		[LABELS.TOAST]: [],
		[LABELS.TOOLBAR]: [
			"packages/structures/src/Toolbar",
			// "packages/structures/src/Toolbar.css",
		],
		[LABELS.TOOLTIP]: [
			"packages/bricks/src/Tooltip",
			// "packages/bricks/src/Tooltip.css",
			"packages/compat/src/Tooltip.tsx",
		],
		[LABELS.TREE]: [
			"packages/structures/src/Tree",
			// "packages/structures/src/Tree.css",
			"packages/structures/src/TreeItem",
			// "packages/structures/src/TreeItem.css",
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
