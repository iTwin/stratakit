FROM mcr.microsoft.com/playwright:v1.46.0-jammy as base
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@9.6.0

FROM base as deps
WORKDIR /kiwi
RUN --mount=type=bind,source=package.json,target=package.json \
    --mount=type=bind,source=apps/test-app/package.json,target=apps/test-app/package.json \
    --mount=type=bind,source=packages/kiwi-react/package.json,target=packages/kiwi-react/package.json \
    --mount=type=bind,source=pnpm-workspace.yaml,target=pnpm-workspace.yaml \
    --mount=type=bind,source=pnpm-lock.yaml,target=pnpm-lock.yaml \
    --mount=type=cache,target=/pnpm/store \
    pnpm install --frozen-lockfile

FROM deps as build
COPY . .
RUN pnpm run build
