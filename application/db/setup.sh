sudo -u postgres psql -c "CREATE USER \"imnetcat\" WITH PASSWORD 'imnetcat';"
sudo -u postgres psql -c "CREATE DATABASE \"imnetcat\" OWNER \"imnetcat\";"

psql -f structure.sql
psql -f data.sql
