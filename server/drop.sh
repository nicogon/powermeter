psql -U postgres -c 'drop database powermeter;'
psql -U postgres -c "CREATE ROLE powermeter LOGIN CREATEDB PASSWORD 'powermeter';"
psql -U postgres -c "CREATE DATABASE powermeter WITH OWNER = powermeter;"