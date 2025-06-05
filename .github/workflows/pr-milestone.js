/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
const MILESTONES = {
	DEFAULT: "2025 Q2",
	API_BRIDGE: "API bridge",
};

const MILESTONE_MAP = {
	[MILESTONES.DEFAULT]: "packages/",
	[MILESTONES.API_BRIDGE]: "packages/compat/",
};

/**
 * @import {Context} from "@actions/github/lib/context"
 * @import {GitHub} from "@actions/github/lib/utils"
 * @param {{ context: Context, github: InstanceType<GitHub> }} args
 */
export default async function prMilestone({ context, github }) {
	const repo = context.repo.repo;
	const owner = context.repo.owner;
	const pr = context.payload.pull_request;
	const prNumber = pr.number;

	try {
		let targetMilestone = null;

		// look at files changed
		const files = await github.paginate(github.rest.pulls.listFiles, {
			owner: owner,
			repo: repo,
			pull_number: prNumber,
		});

		// determine milestone based on files changed
		for (const file of files) {
			const fileName = file.filename;

			for (const [milestone, path] of Object.entries(MILESTONE_MAP)) {
				// check that the current changed file is part of accepted path for the milestone
				if (fileName.startsWith(path)) {
					targetMilestone = milestone;
				}
			}
			if (targetMilestone === MILESTONES.API_BRIDGE) {
				break;
			}
		}

		// if synchronizing, update milestone appropriately (only if new milestone is different)
		const oldMilestone = pr.milestone ? pr.milestone.title : null;

		if (oldMilestone !== targetMilestone) {
			// find milestone to apply
			const milestones = await github.rest.issues.listMilestones({
				owner: owner,
				repo: repo,
				state: "open",
			});
			const milestone = milestones.data.find(
				(m) => m.title === targetMilestone,
			);
			// apply milestone to the PR
			await github.rest.issues.update({
				owner: owner,
				repo: repo,
				issue_number: prNumber,
				milestone: milestone ? milestone.number : null,
			});
		}
	} catch (error) {
		console.log("Failed assigning milestones");
		console.error(error);
	}
}
