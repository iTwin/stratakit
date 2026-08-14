FROM mcr.microsoft.com/playwright:v1.62.1-noble AS base
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@11.18.0

FROM base AS deps

# Remap the existing ubuntu user to the host UID/GID so that files written to
# bind-mounted directories are owned by the correct host user.
ARG UID=1000
ARG GID=1000
RUN usermod -o -u ${UID} ubuntu && groupmod -o -g ${GID} ubuntu

USER ubuntu
WORKDIR /kiwi
FROM deps AS build
COPY  --chown=ubuntu:ubuntu . .
RUN pnpm install --frozen-lockfile
