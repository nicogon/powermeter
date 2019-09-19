PowerMeter
==========

# Table of contents
- [PowerMeter](#powermeter)
- [Table of contents](#table-of-contents)
- [Software Requirements](#software-requirements)
- [Database Setup](#database-setup)
- [Server setup](#server-setup)
- [Usage](#usage)
- [Project structure](#project-structure)
  - [Config](#config)
  - [Controller](#controller)
  - [Gateways](#gateways)
  - [Middlewares](#middlewares)
  - [Migrations](#migrations)
    - [Magias](#magias)
  - [Repositories](#repositories)
  - [Repositories#seeds](#repositoriesseeds)
  - [Services](#services)
  - [Statics and Views](#statics-and-views)
- [Recordatorios](#recordatorios)
  - [Comentar mocks](#comentar-mocks)
- [Sequalize migrations](#sequalize-migrations)
  - [Usage](#usage-1)
- [Sobre nosotros](#sobre-nosotros)
  - [Autores](#autores)


# Software Requirements

* [Postgres](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04)
  * Postgres queda corriendo como un servicio en segundo plano, no es necesario ejecutarlo de forma manual
* [Node](https://nodejs.org/en/)
  * Para instalar Node usamos
    * [NVM](https://github.com/nvm-sh/nvm)
    * [NPM](https://www.npmjs.com/)
      * Un tutorial para amigarse y aprender NPM [How to NPM](https://github.com/workshopper/how-to-npm)

# Database Setup

Run in terminal:

```bash
$ sudo -u postgres psql postgres
postgres=# CREATE ROLE powermeter LOGIN CREATEDB PASSWORD 'powermeter';
postgres=# CREATE DATABASE powermeter WITH OWNER = powermeter;
# Then you can login,
$ psql -h localhost -d powermerter -U powermeter -p 5432
```

[More info in Stackoverflow post](https://stackoverflow.com/questions/2172569/how-do-i-login-and-authenticate-to-postgresql-after-a-fresh-install)

# Server setup

```bash
$ npm install
```

# Usage

Para ejecutar el server
```bash
$ npm run start
```

Para correr el linter
```bash
$ npm run lint
```

# Project structure

## Config
Son javascripts que tienen la configuracion del server. Por ejemplo: nombre de la base de datos, puerto y direccion

## Controller
* Recibe una ruta (URL)
* Consulta/Guarda informacion en la BD (repositories)
* Responde la peticion (response) para el proyecto: con una vista

## Gateways
Son servicios externos. Para el proyecto: no lo deberiamos tener

## Middlewares
Es una capa de abstraccion que realiza configuraciones (usualmente) antes de los controllers, y nos permiten realizar validaciones por ejemplo contra el esquema de la BD o handeleo de errores

## Migrations
Son las transacciones DDL (data definition language) que permiten alterar el esquema de la BD.
Ejemplos: crear una tabla, agregar una columna, elimnar una tabla

### Magias
* Conviene dejar que sequelize haga las migraciones [este post tiene docu oficial](https://sequelize.org/master/manual/migrations.html) asi les agrega un timestamp y respeta estandares. Por las dudas, [este post](https://github.com/sequelize/cli#documentation) tiene mas cosas de sequelize CLI
* Metodos magicos:
  * up = ejecuta la migracion (paso para adelante)
  * down = rollback de la ultima migracion (paso hacia atras)

## Repositories
Aca se guardan los (a continuacion se listan sinonimos, para que se use la abstraccion que mas familiar le parezca)
* Modelo
* Tabla
* Entidad del DER
* Clase
* Unidad de negocio
Del proyecto.

Lo mas importante es la definicion de sequelize (`sequelize.define`). Por ejemplo, en cada repository:

```js
// Voy a suponer para el ejemplo que estoy definiendo el repositorio de usuarios
var users = sequelize.define('users', attributes, {classMethods:{associations}, hooks:{after_transactions} })
```
[En este link](https://sequelize.org/master/manual/associations.html) hay mas doc de sequelize sobre associaciones

## Repositories#seeds
Para hacer pruebas de forma local, siempre esta bueno tener unos datos falsos. Sobre todo para persistir en la BD objetos de prueba y tener algunos ejemplos. Se guardan en esta carpeta

## Services
Son los resposables de interactuar con servicios externos y de "administrar" la base de datos.
La teoria dice:
* Los servicios tienen que ser lo mas simple posible.
* Un servicio NO TIENE QUE interactuar con otro servicio

## Statics and Views
Son las vistas y la parte de front.

# Recordatorios
## Comentar mocks
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

# Sequalize migrations
[Official doc](https://sequelize.org/master/manual/migrations.html)
## Usage
```bash
$ npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
$ npx sequelize-cli db:migrate
```

# Sobre nosotros
UTN FRBA - 2019 - Grupo 206 - PowerMeter Server

## Autores
* Bober Ivan,
* Gonzalez Nicolas,
* Vazquez Nogueiras Hector,
* Voboril Lucas
