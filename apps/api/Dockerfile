FROM node:18.12.1-alpine AS deps

WORKDIR /app
COPY dist/apps/api/package*.json ./
COPY dist/apps/api/*.lock ./

RUN yarn install --production

FROM alpine:3.17.0 AS runtime
RUN apk --no-cache add nodejs
ENV NODE_ENV production
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY dist/apps/api .

EXPOSE 4000

CMD ["node", "main.js"]