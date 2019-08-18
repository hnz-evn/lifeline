# Load environment variables from .env file
export $(xargs < config/local.env)

# Run `postgres` container in detached mode
docker run -d \
  -e POSTGRES_DB=lifeline \
  -p 5432:5432 \
  --name lifeline-local-pg \
  postgres:9.6.9-alpine

# Run DB wait and migrate script
node scripts/dbWaitAndMigrate.js

# Run app entrypoint within nodemon
npx nodemon index.js
