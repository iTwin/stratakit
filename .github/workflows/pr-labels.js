/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const LABELS = {
	ACCORDION: "component: AccordionItem",
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
	MUI: "MUI",
};

const LABEL_MAP = {
	[LABELS.ACCORDION]: ["packages/structures/src/AccordionItem"],
	[LABELS.ANCHOR]: ["packages/bricks/src/Anchor"],
	[LABELS.AVATAR]: ["packages/bricks/src/Avatar"],
	[LABELS.BADGE]: ["packages/bricks/src/Badge"],
	[LABELS.BANNER]: ["packages/structures/src/Banner"],
	[LABELS.BREADCRUMB]: [],
	[LABELS.BUTTON]: ["packages/bricks/src/Button"],
	[LABELS.CARD]: [],
	[LABELS.CHECKBOX]: ["packages/bricks/src/Checkbox"],
	[LABELS.CHIP]: ["packages/structures/src/Chip"],
	[LABELS.CODE_SNIPPET]: [],
	[LABELS.DESCRIPTION]: ["packages/bricks/src/Description"],
	[LABELS.DIALOG]: ["packages/structures/src/Dialog"],
	[LABELS.DIVIDER]: ["packages/bricks/src/Divider"],
	[LABELS.DROPDOWN_MENU]: ["packages/structures/src/DropdownMenu"],
	[LABELS.ERROR_REGION]: ["packages/structures/src/ErrorRegion"],
	[LABELS.FIELD]: ["packages/bricks/src/Field"],
	[LABELS.ICON]: ["packages/foundations/src/Icon"],
	[LABELS.ICON_BUTTON]: ["packages/bricks/src/IconButton"],
	[LABELS.KBD]: ["packages/bricks/src/Kbd"],
	[LABELS.LABEL]: ["packages/bricks/src/Label"],
	[LABELS.LIST]: [],
	[LABELS.PAGINATION]: [],
	[LABELS.PLATFORM_BAR]: ["packages/structures/src/NavigationRail"],
	[LABELS.POPOVER]: ["packages/structures/src/Popover"],
	[LABELS.PROGRESS_BAR]: ["packages/bricks/src/Progress"],
	[LABELS.RADIO]: ["packages/bricks/src/Radio"],
	[LABELS.SELECT]: ["packages/bricks/src/Select"],
	[LABELS.SKELETON]: ["packages/bricks/src/Skeleton"],
	[LABELS.SPINNER]: ["packages/bricks/src/Spinner"],
	[LABELS.SWITCH]: ["packages/bricks/src/Switch"],
	[LABELS.TABLE]: ["packages/structures/src/Table"],
	[LABELS.TABS]: ["packages/structures/src/Tabs"],
	[LABELS.TEXT]: ["packages/bricks/src/Text."],
	[LABELS.TEXT_BOX]: ["packages/bricks/src/TextBox"],
	[LABELS.TOAST]: [],
	[LABELS.TOOLBAR]: ["packages/structures/src/Toolbar"],
	[LABELS.TOOLTIP]: ["packages/bricks/src/Tooltip"],
	[LABELS.TREE]: [
		"packages/structures/src/Tree",
		"packages/structures/src/TreeItem",
	],
	[LABELS.GITHUB_ACTIONS]: [".github/workflows"],
	[LABELS.MUI]: ["packages/mui"],
};

/**
 * @import {context} from "@actions/github"
 * @import {GitHub} from "@actions/github/lib/utils"
 * @param {{ context: typeof context, github: InstanceType<GitHub> }} args
 */
export default async function prLabels({ context, github }) {
	const repo = context.repo.repo;
	const owner = context.repo.owner;
	const pr = context.payload.pull_request;
	const prNumber = pr?.number;

	if (!prNumber) {
		console.log("No pull request found in the context.");
		return;
	}

	const labelsToAdd = new Set();

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
