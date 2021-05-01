sudo -u postgres psql -c "CREATE USER \"$USER\" WITH PASSWORD '$USER';"
sudo -u postgres psql -c "CREATE DATABASE \"$USER\" OWNER \"$USER\";"

psql -f structure.sql
psql -f data.sql
