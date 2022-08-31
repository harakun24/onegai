# onegai website Information

## 1. STRUKTUR WEB

- config
  - config.js <i style="color:orange">core website</i>
  - path.js <i style="color:aqua">configure \_\_dirname</i>
  - express-svelte <i style="color:green">custom view engine: svelte for express</i>
  - ctrl-cli.js <i style="color:pink">generator controller</i>
  - model-cli.js <i style="color:pink">generator model</i>
  - router-cli.js <i style="color:pink">generator router</i>
- Controllers
  - baseController.js <i style="color:aqua">base class for controller</i>
  - ... [list of controller]
- Models
  - index.js <i style="color:aqua">Model Adapter</i>
  - BaseModel.js <i style="color:aqua">base class for models</i>
  - index@association.js <i style="color:orange">describe relation between models</i>
  - index@list.js <i style="color:aqua">listing models</i>
  - ... [list of models]
- public <i style="color:salmon">static file served by express</i>
- Routers
  - index.js <i style="color:aqua">grouping routers</i>
  - BaseRouter.js <i style="color:aqua">a base class for router</i>
  - ... [list of router]
- Views <i style="color:orange">files svelte</i>
- .env
- index.js <i style="color:aqua">web server // start point</i>
- db.sqlite <i style="color:aqua">database</i>

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

      semua router diexport dalam satu file /Routers/index.js

      ```js
      export * from "./DefaultRouter.js";
      ```

      class router merupakan turunan dari class **BaseRouter**

      ```javascript
      import { BaseRouter } from "./BaseRouter.js";

      export class DefaultRouter extends BaseRouter {}
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

      semua controller merupakan turunan dari BaseController

      ```js
      import { BaseController } from "./BaseController.js";
      export class DefaultController extends BaseController {}
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

      semua model merupakan turunan BaseModel

      ```js
      import { BaseModel, type } from "./BaseModel.js";
      export class UserModel extends BaseModel {}
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
