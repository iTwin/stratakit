/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const LABELS = {
	API_BRIDGE: "API bridge",
	GITHUB_ACTIONS: "github_actions",
	PKG_FOUNDATIONS: "pkg: @stratakit/foundations",
	PKG_ICONS: "pkg: @stratakit/icons",
	PKG_INTERNAL_UTILS: "pkg: @stratakit/internal-utils",
	PKG_BRICKS: "pkg: @stratakit/bricks",
	PKG_MUI: "pkg: @stratakit/mui",
	PKG_STRUCTURES: "pkg: @stratakit/structures",
	DOCUMENTATION: "documentation",
};

const LABEL_MAP = {
	[LABELS.GITHUB_ACTIONS]: [".github/workflows"],
	[LABELS.PKG_FOUNDATIONS]: ["packages/foundations"],
	[LABELS.PKG_ICONS]: ["packages/icons"],
	[LABELS.PKG_INTERNAL_UTILS]: ["packages/internal-utils"],
	[LABELS.PKG_BRICKS]: ["packages/bricks"],
	[LABELS.PKG_MUI]: ["packages/mui"],
	[LABELS.PKG_STRUCTURES]: ["packages/structures"],
	[LABELS.DOCUMENTATION]: ["apps/website/src/content/docs"],
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
