FROM mcr.microsoft.com/playwright:v1.62.1-noble
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@11.18.0

# Remap the existing ubuntu user to the Linux host UID/GID so that files written
# to bind-mounted directories are owned by the correct host user. Calling script
# needs to override LINUX_HOST via build args
ARG UID=1000
ARG GID=1000
ARG LINUX_HOST=false
RUN if [ "$LINUX_HOST" = "true" ]; then usermod -o -u ${UID} ubuntu && groupmod -o -g ${GID} ubuntu; fi

USER ubuntu
WORKDIR /kiwi

# Copy dependency manifests first so the install layer is only invalidated
# when the lockfile, package.json files, or patches change — not on source changes.
COPY --chown=ubuntu:ubuntu --parents \
    packages/*/package.json \
    apps/*/package.json \
    internal/package.json \
    examples/package.json \
    pnpm-workspace.yaml pnpm-lock.yaml package.json \
    ./
RUN --mount=type=cache,uid=${UID},gid=${GID},target=/home/ubuntu/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Copy other files in that the tests need that don't affect pnpm install.  The
# build directory for the server is mounted so it does not need to be copied.    
COPY --chown=ubuntu:ubuntu apps/test-app/playwright.config.ts apps/test-app/
