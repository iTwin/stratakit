/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { Octokit } from "@octokit/rest";

export default async function prMilestone() {
	const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

	const repo = process.env.REPO;
	const owner = process.env.REPO_OWNER;
	const prNumber = process.env.PR_NUMBER;

	// milestone title constants
	const MILESTONES = {
		DEFAULT: "2025 Q2",
		API_BRIDGE: "API bridge",
	};

	// map milestones to paths
	const MILESTONE_MAP = {
		[MILESTONES.DEFAULT]: "packages/",
		[MILESTONES.API_BRIDGE]: "packages/compat/",
	};

	try {
		let targetMilestone = null;

		// look at files changed
		const files = await octokit.paginate(octokit.rest.pulls.listFiles, {
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
					if (targetMilestone === MILESTONES.API_BRIDGE) {
						break;
					}
				}
			}
		}

		// find milestone to apply
		const milestones = await octokit.rest.issues.listMilestones({
			owner: owner,
			repo: repo,
			state: "open",
		});
		const milestone = milestones.data.find((m) => m.title === targetMilestone);

		// apply milestone to the PR
		await octokit.rest.issues.update({
			owner: owner,
			repo: repo,
			issue_number: prNumber,
			milestone: milestone ? milestone.number : null,
		});
	} catch (error) {
		console.log("Failed assigning milestones");
		console.error(error);
	}
}
