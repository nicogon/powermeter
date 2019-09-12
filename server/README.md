PowerMeter
==========

# Table of contents
- [PowerMeter](#powermeter)
- [Table of contents](#table-of-contents)
  - [Software Requirements](#software-requirements)
  - [Database Setup](#database-setup)
  - [Server setup](#server-setup)
  - [Usage](#usage)
  - [Recordatorios](#recordatorios)
    - [Comentar mocks](#comentar-mocks)
  - [Sequalize migrations](#sequalize-migrations)
    - [Usage](#usage-1)
  - [Sobre nosotros](#sobre-nosotros)
    - [Autores](#autores)


## Software Requirements

* [Postgres](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04)
  * Postgres queda corriendo como un servicio en segundo plano, no es necesario ejecutarlo de forma manual
* [Node](https://nodejs.org/en/)
  * Para instalar Node usamos
    * [NVM](https://github.com/nvm-sh/nvm)
    * [NPM](https://www.npmjs.com/)
      * Un tutorial para amigarse y aprender NPM [How to NPM](https://github.com/workshopper/how-to-npm)

## Database Setup

Run in terminal:

```bash
$ sudo -u postgres psql postgres
postgres=# CREATE ROLE powermeter LOGIN CREATEDB PASSWORD 'powemeter';
postgres=# CREATE DATABASE powermeter WITH OWNER = powermeter;
# Then you can login,
$ psql -h localhost -d powemerter -U powermeter -p 5432
```

[More info in Stackoverflow post](https://stackoverflow.com/questions/2172569/how-do-i-login-and-authenticate-to-postgresql-after-a-fresh-install)

## Server setup

```bash
$ npm install
```

## Usage

Para ejecutar el server
```bash
$ npm run start
```

Para correr el linter
```bash
$ npm run lint
```

## Recordatorios
### Comentar mocks
Por defecto, al correr el server tambien se va a ejecutar el mock de los dispositivos.
Para evitar esto, hay que descomentar
```js
// package.json
"start_mock": "./node_modules/.bin/nodemon --inspect dispoMock.js"
```

O crear la variable de entorno

```rb
# .env
DISABLE_MOCK=true
```

## Sequalize migrations
[Official doc](https://sequelize.org/master/manual/migrations.html)
### Usage
```bash
$ npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
$ npx sequelize-cli db:migrate
```

## Sobre nosotros
UTN FRBA - 2019 - Grupo 206 - PowerMeter Server

### Autores
* Bober Ivan,
* Gonzalez Nicolas,
* Vazquez Nogueiras Hector,
* Voboril Lucas
