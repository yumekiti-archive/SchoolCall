dc := docker compose -f ./docker-compose.yml

up:
	cp ./.env.example ./.env
	$(dc) up -d

down:
	$(dc) down

restart:
	$(dc) restart

reup:
	@make down
	@make up

rm:
	$(dc) down --rmi all

logs:
	$(dc) logs -f

app:
	$(dc) exec app /bin/sh

db:
	$(dc) exec db /bin/sh

.PHONY:	up down restart reup rm logs app db

.PHONY: migrate
migrate:
	cp ./.env.example ./.env
	$(dc) exec app npx prisma migrate dev

.PHONY: generate
generate:
	$(dc) exec app npx prisma generate

.PHONY: studio
studio:
	$(dc) exec app npx prisma studio
