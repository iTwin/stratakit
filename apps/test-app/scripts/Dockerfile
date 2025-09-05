FROM mcr.microsoft.com/playwright:v1.55.0-noble AS base
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@9.15.4

FROM base AS deps
WORKDIR /kiwi
FROM deps AS build
COPY . .
RUN pnpm install --frozen-lockfile
