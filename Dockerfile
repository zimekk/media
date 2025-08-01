ARG BASE=node:22.17-alpine
FROM $BASE AS builder
# RUN apk add --no-cache tree
# RUN apk add --no-cache libc6-compat
# RUN apk update
# Set working directory
WORKDIR /app
# RUN yarn global add turbo
RUN npm i -g turbo
COPY . .
RUN turbo prune --scope=web --docker
# RUN tree

# Add lockfile and package.json's of isolated subworkspace
FROM $BASE AS installer
# RUN apk add --no-cache tree
# RUN apk add --no-cache libc6-compat
# RUN apk update
WORKDIR /app
RUN npm i -g pnpm
 
# First install the dependencies (as they change less often)
COPY .gitignore .gitignore
COPY --from=builder /app/out/json/ .
# COPY --from=builder /app/out/yarn.lock ./yarn.lock
# RUN yarn install
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
# COPY --from=builder /app/out/pnpm-workspace.yaml ./pnpm-workspace.yaml
# COPY --from=builder /app/out/pnpm-*.yaml ./
# RUN ls -la
RUN pnpm i
 
# Build the project
COPY --from=builder /app/out/full/ .
COPY --from=builder /app/tsconfig.json ./
# RUN ls -la
RUN yarn turbo run build --filter=web...
# RUN tree -I node_modules
 
FROM $BASE AS runner
WORKDIR /app
 
# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
USER nextjs
 
COPY --from=installer /app/apps/web/next.config.mjs .
COPY --from=installer /app/apps/web/package.json .
 
# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/standalone ./
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/.next/static ./apps/web/.next/static
COPY --from=installer --chown=nextjs:nodejs /app/apps/web/public ./apps/web/public

ENV PORT 3000
CMD node apps/web/server.js
