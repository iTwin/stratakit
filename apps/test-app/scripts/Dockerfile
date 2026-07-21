FROM mcr.microsoft.com/playwright:v1.60.0-noble

RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@10.30.1

# Remap the existing ubuntu user to the host UID/GID so that files written to
# bind-mounted directories are owned by the correct host user.
ARG UID=1000
ARG GID=1000
RUN usermod -u ${UID} ubuntu && groupmod -g ${GID} ubuntu

USER ubuntu
WORKDIR /kiwi

# Copy dependency manifests first so the install layer is only invalidated
# when the lockfile, package.json files, or patches change — not on source changes.
COPY --chown=ubuntu:ubuntu --parents \
    packages/*/package.json \
    apps/*/package.json \
    internal/package.json \
    examples/package.json \
    .npmrc pnpm-workspace.yaml pnpm-lock.yaml package.json \
    ./
COPY --chown=ubuntu:ubuntu patches/ patches/
RUN --mount=type=cache,uid=${UID},gid=${GID},target=/home/ubuntu/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY --chown=ubuntu:ubuntu apps/test-app/playwright.config.ts apps/test-app/
COPY --chown=ubuntu:ubuntu apps/test-app/tsconfig.json apps/test-app/
