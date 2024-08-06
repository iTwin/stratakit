/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { spawn } from "node:child_process";
import { join } from "node:path";

const dockerFilePath = join(__dirname, "..");
const imageName = "kiwi";
const containerName = `${imageName}-container`;
const [_node, _fileName, ...args] = process.argv;

async function execute(command: string, args: string[] = []) {
	return new Promise<void>((resolve, reject) => {
		const spawnProcess = spawn(command, args, { stdio: "inherit" });
		spawnProcess.on("close", (status) => {
			if (status !== 0) {
				console.error(`Command failed with code ${status}`);
				return reject(
					new Error(`Command failed: ${command} ${args.join(" ")}`),
				);
			}
			resolve();
		});
	});
}

async function run() {
	try {
		// Run container
		await execute("docker", [
			"run",
			"--name",
			containerName,
			imageName,
			...args,
		]);
	} finally {
		const pckDir = `${containerName}:/kiwi/apps/test-app`;
		const hostPckDir = join(__dirname, "..", "apps", "test-app");
		// Copy snapshots from docker container to the local repo
		await execute("docker", ["cp", `${pckDir}/app`, hostPckDir]);
		// Copy the `test-results`
		await execute("docker", ["cp", `${pckDir}/test-results`, hostPckDir]);
		// Copy `playwright-report`
		await execute("docker", ["cp", `${pckDir}/playwright-report`, hostPckDir]);
	}
}

void (async () => {
	try {
		// Build image
		await execute("docker", ["build", "-t", imageName, dockerFilePath]);

		// Run the container
		await run();
	} finally {
		// Remove the container
		await execute("docker", ["rm", "-f", containerName]);
	}
})();
