/*---------------------------------------------------------------------------------------------
 * Copyright (c) Bentley Systems, Incorporated. All rights reserved.
 * See LICENSE.md in the project root for license terms and full copyright notice.
 *--------------------------------------------------------------------------------------------*/

import { spawn } from "node:child_process";
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const repoDir = fileURLToPath(new URL("../../..", import.meta.url));
const appDir = fileURLToPath(new URL("..", import.meta.url));
const dockerfilePath = fileURLToPath(new URL("./Dockerfile", import.meta.url));

const imageName = "kiwi";
const containerRepoDir = "/kiwi";
const containerAppDir = `${containerRepoDir}/apps/test-app`;

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
	// Create the test output folder mount point in case it does not exist
	await mkdir(`${appDir}/test-results`, { recursive: true });

	// On Linux, pass the host UID/GID as build args so the image's ubuntu user
	// is remapped to match — files written to bind-mounted directories are then
	// owned by the correct host user. On macOS, Docker Desktop handles ownership
	// transparently via its Linux VM. process.getuid is undefined on Windows.
	const isLinux = process.platform === "linux";
	const uidArgs =
		isLinux && process.getuid && process.getgid
			? [
					"--build-arg",
					"LINUX_HOST=true",
					"--build-arg",
					`UID=${process.getuid()}`,
					"--build-arg",
					`GID=${process.getgid()}`,
				]
			: [];

	await execute("docker", [
		"build",
		"-t",
		imageName,
		"-f",
		dockerfilePath,
		...uidArgs,
		repoDir, // Build context
	]);

	await execute("docker", [
		"run",
		"--init", // Use init process to handle zombie processes
		"--rm", // Remove the container after run
		"-v", // Mount the .spec files
		`${appDir}/app:${containerAppDir}/app`,
		"-v", // Mount build directory with website code
		`${appDir}/build:${containerAppDir}/build`,
		"-v", // Mount results directory
		`${appDir}/test-results:${containerAppDir}/test-results`,
		"-w", // Set working directory
		containerAppDir,
		imageName,
		...args,
	]);
})();
