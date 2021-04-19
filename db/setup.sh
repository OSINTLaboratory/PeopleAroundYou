su - postgres psql -c "CREATE USER \"$USER\" WITH PASSWORD '$USER';"
su - postgres psql -c "CREATE DATABASE application OWNER \"$USER\";"
psql -d application -f install.sql

