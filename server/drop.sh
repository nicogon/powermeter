npm run sequelize db:drop
npm run sequelize db:create
npm run migrations
PGPASSWORD=powermeter psql -h localhost -p 5432 -U powermeter -d powermeter -1 -f ./db/backups/202011041335-powermeter.dump
