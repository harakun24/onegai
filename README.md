# onegai website Information

## 1. STRUKTUR WEB

- config
  - config.js --------------------- core website</i>
  - path.js ----------------------- configure \_\_dirname</i>
  - express-svelte --------------- custom view engine: svelte for express</i>
  - ctrl-cli.js --------------------- generator controller</i>
  - model-cli.js -----------------&nbsp; generator model</i>
  - router-cli.js ------------------ generator router</i>
- Controllers
  - baseController.js ------------ base class for controller</i>
  - ... [list of controller]
- Models
  - index.js ---------------------- Model Adapter</i>
  - BaseModel.js --------------- base class for models</i>
  - index@association.js ------- describe relation between models</i>
  - index@list.js ---------------- listing models</i>
  - ... [list of models]
- public ---------------------------- static file served by express</i>
- Routers
  - index.js --------------------- grouping routers</i>
  - BaseRouter.js --------------- a base class for router</i>
  - ... [list of router]
- Views ---------------------------- files svelte</i>
- .env
- index.js -------------------------- web server // start point</i>
- db.sqlite ------------------------- database</i>

---

## 2. Pre run

1. clone github project [here](https://github.com/harakun24/onegai.git)
2. install dependency via terminal

   ```
   > npm i
   ```

3. run web server

   ```
   > npm run dev
   ```

---

## 3. Flow program

1.  web server

    - import express instance
      ```javascript
      import app from "./config/config.js";
      ```
    - using routers in **Routers** directory
      ```javascript
      app.routeHandler();
      ```
    - error handling 404 & 500

      ```javascript
      app.notFound((res) => {
        res.send("<h1>url not found</h1>");
      });

      app.internalError = (res) => {
        res.send(`<h1>internal server error</h1>
         <p>${res.message}</p>
         <p>${res.req.url}</p>`);
      };
      ```

    - server port listen
      ```javascript
      app.launch((addr) => {
        console.log(`\n\tserver listen on :${addr.port}\n`.cyan);
      });
      ```

2.  Interaksi antar Class

    > diinisialisasi oleh method **routeHandler**

    - ### class Router

      - pembuatan menggunakan /config/router-cli.js
        ```
         > node ./config/router-cli.js RouterBaru
        ```
        semua router diexport dalam satu file /Routers/index.js

      ```js
      export * from "./DefaultRouter.js";
      ```

      class router merupakan turunan dari class **BaseRouter**

      ```javascript
      import { BaseRouter } from "./BaseRouter.js";

      export class DefaultRouter extends BaseRouter {...}
      ```

      attribute driver mengatur end point untuk router tersebut

      ```js
      this.driver = "/";
      ```

      semua Router memiliki controller yang bertanggung jawab untuk router tersebut

      ```js
      import { DefaultController } from "../Controllers/DefaultController.js";
      //...
      this.#service = new DefaultController();
      ```

      - #### Bounding sub routing dengan handler
        - attribute router
        ```js
        #list = [
         //list route
         "/<@get>index",
        ];
        ```
        Format string `/<@get>index`:
        - `/` [end-point](#)
        - `<@get>` [method](#)
        - `index` [method Controller](#)
      - menggunakan Controller
        ```js
        import { DefaultController } from "../Controllers/DefaultController.js";
        //...
        this.#service = new DefaultController();
        this.bound(this.#list, this.#service);
        ```

    - ### class Controller

      - pembuatan menggunakan /config/ctrl-cli.js
        ```
         > node ./config/ctrl-cli.js ControllerBaru
        ```
        semua controller merupakan turunan dari BaseController

      ```js
      import { BaseController } from "./BaseController.js";
      export class DefaultController extends BaseController {...}
      ```

      Controller mengakses class Model melalui ModelAdapter

      ```js
       import ModelAdapter from "../Models/index.js";
       //...
       get Models() {
        return ModelAdapter.list;
       }
      ```

    - ### class Model

      - pembuatan menggunakan /config/model-cli.js
        ```
         > node ./config/model-cli.js ModelBaru
        ```
        semua model merupakan turunan BaseModel

      ```js
      import { BaseModel, type } from "./BaseModel.js";
      export class UserModel extends BaseModel {...}
      ```

      mendeklarasikan schema table dalam database

      ```js
      const { INTEGER, STRING } = type;
      //...
      static table = "user";
      static fields = {
        userID: { type: INTEGER, primaryKey: true, autoIncrement: true },
        name: STRING,
        gender: STRING,
      };
      ```

---

## 4. Error Handling

gunakan try...catch block

```js
try {
  // TODO
} catch (ex) {
  // TODO
}
```

handling 404 dan 500

```js
app.notFound((res) => {
  res.send("<h1>url not found</h1>");
});

app.internalError = (res) => {
  res.send(`
      <h1>internal server error</h1>
      <p>${res.message}</p>
      <p>${res.req.url}</p>
  `);
};
```

implementasi internal error

```js
try {
  // TODO
} catch (ex) {
  res.message = ex.message;
  res.req.app.internalError(res);
}
```
