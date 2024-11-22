#!/bin/bash

# Проверка, существует ли база данных
psql -U postgres -c "SELECT 1 FROM pg_database WHERE datname='inventory_db'" | grep -q 1

if [ $? -ne 0 ]; then
    # Создание пользователя и базы данных
    psql -U postgres -c "CREATE USER admin WITH PASSWORD '0000';"
    psql -U postgres -c "CREATE DATABASE inventory OWNER admin;"
    psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE inventory TO admin;"
    # Создание базы данных
    psql -U admin -c "CREATE DATABASE inventory_db;"

    # Запуск SQL-скрипта для создания таблиц
    psql -U postgres -d inventory_db -f init_db.sql
fi