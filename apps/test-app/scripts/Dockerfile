FROM mcr.microsoft.com/playwright:v1.62.1-noble AS base
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@11.18.0

FROM base AS deps

# Remap the existing ubuntu user to the Linux host UID/GID so that files written
# to bind-mounted directories are owned by the correct host user. Calling script
# needs to override LINUX_HOST via build args
ARG UID=1000
ARG GID=1000
ARG LINUX_HOST=false
RUN if [ "$LINUX_HOST" = "true" ]; then usermod -o -u ${UID} ubuntu && groupmod -o -g ${GID} ubuntu; fi

USER ubuntu
WORKDIR /kiwi
FROM deps AS build
COPY --chown=ubuntu:ubuntu . .
RUN pnpm install --frozen-lockfile
