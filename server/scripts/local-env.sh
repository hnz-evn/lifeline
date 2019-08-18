# Run `postgres` container in detached mode
docker run -d \
  -e POSTGRES_DB=lifeline \
  -p 5432:5432 \
  --name lifeline-local-pg \
  postgres:9.6.9-alpine

# Run DB wait and migrate script
env $(cat config/local.env) node scripts/dbWaitAndMigrate.js
