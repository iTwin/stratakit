ARG PLAYWRIGHT_VERSION=1.46.0
ARG PNPM_VERSION=9.6.0

################################################################################
FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-jammy as base

WORKDIR /kiwi

# Install pnpm.
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

################################################################################
FROM base as deps

# Pnpm install.
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=apps/test-app/package.json,target=apps/test-app/package.json \
    --mount=type=bind,source=packages/kiwi-react/package.json,target=packages/kiwi-react/package.json \
    --mount=type=bind,source=pnpm-workspace.yaml,target=pnpm-workspace.yaml \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

################################################################################
FROM deps as build

# Copy the source files.
COPY . .

# Run the build.
RUN pnpm run build
