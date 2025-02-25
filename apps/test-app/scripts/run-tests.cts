/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/
import { spawn } from "node:child_process";
import { join } from "node:path";
import { join as posixJoin } from "node:path/posix";

const repoDir = join(__dirname, "..", "..", "..");
const appDir = join(repoDir, "apps", "test-app");

const imageName = "kiwi";
const containerRepoDir = "/kiwi";
const containerAppDir = posixJoin(containerRepoDir, "apps", "test-app");

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

void (async () => {
	await execute("docker", ["build", "-t", imageName, repoDir]);

	await execute("docker", [
		"run",
		"--rm", // Remove the container after run
		"-v", // Mount snapshot directory from host to container
		`${appDir}/app:${containerAppDir}/app`,
		"-v", // Mount test-results directory from host to container
		`${appDir}/test-results:${containerAppDir}/test-results`,
		"-v", // Mount playwright-report directory from host to container
		`${appDir}/playwright-report:${containerAppDir}/playwright-report`,
		"-w", // Set working directory
		containerAppDir,
		imageName,
		...args,
	]);
})();
