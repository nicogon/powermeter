docker-compose run powermeter npm run sequelize db:create
docker-compose run powermeter npm run migrations
docker-compose run powermeter npm run seeds
docker-compose up
