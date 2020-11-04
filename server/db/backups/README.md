# Create dump

    ssh pi@192.168.4.1 "pg_dump --verbose --no-acl --no-privileges --data-only --host localhost --username \"powermeter\" " > ~/timestamp-powermeter.dump

# Import dump

    psql -h localhost -p 5432 -U powermeter -d powermeter -1 -f ~/timestamp-powermeter.dump
