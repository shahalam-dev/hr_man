# Application Documentation

## Steps to up and run the application

1. Clone or download this repository on your local machine using git clone command:
2. Run the command to install dependencies

   ```bash
   npm install
   ```

3. Change database connection details inside `config/config.json`
4. create .env file and set those environment variable
   ```
    NODE_ENV=
    JWT_SECRET=
    PORT=
    CLIENT_URL=
    SERVER_URL=
    EMAIL=
    EMAIL_APP_PASS=
   ```
5. To migrate database tables run the command
   ```bash
   npx sequelize-cli db:migrate --env="value"
   ```
6. finally run this command to up and run the application
   ```bash
   npm run dev
   ```

---

---

---

## folder structure

```
    │
    ├── config [config files]
    ├── controller [controller file]
    │   ├── *.controller.js
    ├── database
    │   ├── connection.js [DB connection]
    │   ├── models.js [exporting all models]
    │   ├── index.js [exporting connection and models]
    ├── middlewares [contains middlewares]
    ├── migrations [contains db migration's files]
    ├── model [contains db models]
    ├── routes [contains all route's files]
    ├── services
    │   ├── css
    │   │   ├── **/*.service.js [logic details for controllers]
    │   │   ├── index.js [to export all services]
    ├── utils [utility functions]
    ├── validator
    │   ├── validate.js [request validation]
    ├── node_modules
    ├── package.json
    ├── package-lock.json
    ├── error.log [application error log]
    ├── .env
    ├── api.postman.json [apis file for postman]
    └── .gitignore


```

---

---

---

### import `api.postman.json` file into postman and start playing with apis
