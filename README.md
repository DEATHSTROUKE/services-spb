# Инструкция по запуску на локалке

1. Склонировать репозиторий

```sh
git clone git@github.com:DEATHSTROUKE/services-spb.git
```

2. Убедиться, что есть файлы .env в папке frontend и backend, а также файл .env.postgres с данными внутри

3. Запустить приложение из корневой директории

```sh
docker compose up -d --build
```
