
# DPDzero-assignment

This project is a backend system that implements the API's for user registration, token generation, and to perform CRUD operations of key value pairs.
## Framework used

- **PostgresSQL** : A relational database system that supports SQL queries and transactions.

- **Prisma** : An ORM (object-relational mapping) tool that simplifies database access and schema management.

- **Expressjs** : A web framework for nodejs that provides features such as routing, middleware, and error handling.

 - **Nodejs** : A runtime environment that executes JavaScript code outside the browser.
## DB Schema

![Schema](https://github.com/ancxanas/DPDZero/blob/main/Schema.png)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT` `SECRET` `POSTGRES_URI` 


PORT : The PORT number to listen for incoming requests.

SECRET : The Secret key for JSON web token encryption and decryption.

POSTGRES_URI : Database URL of the PostgresSQL database to be used.
## Installation

Install DPDzero-assignment with npm

```bash
  cd DPDzero
    npm Install
```
    
## Run Locally

Clone the project

```bash
  git clone https://github.com/ancxanas/DPDZero.git
```

Go to the project directory

```bash
  cd DPDZero
```

Install dependencies

```bash
  npm install
```

Setup .env

```
PORT  POSTGRES_URI  SECRET
```

Start the server

```bash
  npm run dev
```

