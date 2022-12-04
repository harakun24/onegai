# onegai website Information

## struktur direktori

- app - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - app directory
  - database - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - database directory
    - [database].sqlite ------------------------------------- the database
    - up.migrate.js ----------------------------------------- up script
  - Models - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - models directory
    - SampleModel.js -------------------------------------- sample model
    - BaseModel.js ----------------------------------------- class base for model
    - index.js ----------------------------------------------- singleton model adapter
    - model@assoc.js ------------------------------------- function to assoctiating between models
    - model@list.js ---------------------------------------- listing all models
    - ModelAdapter.js ------------------------------------ adapter models to interact with sequelize
  - Routers - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - routers directory
    - SampleRouter.js ------------------------------------- sample router
    - BaseRouter.js ---------------------------------------- class base for router
    - DefaultRouter.js ------------------------------------- example router
  - Services - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - services directory
    - SampleService.js ------------------------------------ sample service
    - BaseService.js --------------------------------------- class base for service
    - DefaultService.js ------------------------------------ blueprint / example for service
  - Views - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - views directory
    - components - - - - - - - - - - - - - - - - - - - - - - - - - active views
      - sample - - - - - - - - - - - - - - - - - - - - - - - - - view's components for sample
        - add-content.html ------------------------- append editable row before first record for create
        - edit-content.html ------------------------- swap table record to editable input for update
        - pagination-content.html ----------------- show the table navigation
        - row-content.html ------------------------- template row per record
        - table-content.html ------------------------ serve table
    - layouts - - - - - - - - - - - - - - - - - - - - - - - - - - - - view's layouts
      - dashboard.html -------------------------------- dashboard layout
      - template.html ---------------------------------- main layout -> called another layout as child
    - partials - - - - - - - - - - - - - - - - - - - - - - - - - - - - partials layout
      - footer.html ------------------------------------- footer page
      - header.html ------------------------------------ header page
      - navbar.html ------------------------------------ navbar page
      - sidebar.html ------------------------------------ side bar page
- public - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - static routing as `/assets`
- .env ------------------------------------------------------------ configuration env
- index.js --------------------------------------------------------- web server
- migrate.js ------------------------------------------------------- migrate script
- path.js ----------------------------------------------------------- path helper
- setting.config.js ------------------------------------------------ main helper
- test-area.js ----------------------------------------------------- testing code

---

# models

## sample

```js
import { BaseModel, type } from "./BaseModel.js";

export class SampleModel extends BaseModel {
  static tableName = "sample";
  static tableFields = {
    sample_id: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    sample_name: type.STRING,
  };
}
```

- tableName => nama table
- tableFields => the fields of table

## listing on `model@list.js`

```js
export { SampleModel as Sample } from "./SampleModel.js";
```

## associationg with other tables

go to file : `model@assoc.js`

```js
// pass by reference
export default (models) => {
  const { Sample, SubSample } = models;

  Sample.hasMany(SubSample, {
    foreignKey: "fk_sample",
    constraints: false,
  });
  SubSample.belongsTo(Sample, {
    foreignKey: "fk_sample",
    constraints: false,
  });
};
```

---

# Service

sample

```js
import base from "./BaseService.js";
import { Op } from "sequelize";

const { Sample } = base.models;
export class SampleService extends base {
  constructor() {
    super("sample");
  }
  async render(req, res) {
    res.render("layouts/template");
  }
  //data management
  async create(req, res) {
    ...
  }

  async update(req, res) {
    ...
  }

  async delete(req, res) {
    ...
  }
  async deleteAll(req, res) {
    ...
  }

  //micro views
  async res_dashboard(req, res) {
    res.render("layouts/dashboard.html");
  }
};

```

- access all models via static attribute of baseclass

```js
const { Sample } = base.models;
```

---

# Router

sample

```js
import base from "./BaseRouter.js";
import { SampleService } from "../Services/SampleService.js";
import SubSample from "./SubSampleRouter.js";

const service = new SampleService();
class SampleRouter extends base {
  constructor() {
    super();

    this.route("/", {
      get: [{ "/": service.render }],
      post: [{ "/create": service.create }],
      put: [{ "/update/:id": service.update }],
      delete: [
        { "/delete/:id": service.delete.bind(service) },
        { "/delete-all": service.deleteAll },
      ],
      sub: [{ "/sub": SubSample.handler[1] }],
      // micro views
      swap: [
        {
          "/dashboard": service.res_dashboard,
        },
      ],
    });
  }
}

export default new AdminRouter();
```

## router handler

- router has special attribute called `handler` type of Array

```js
["/enpoint", express.Router];
```

- rest standard method routing:

```js
this.route("/endpoint", {
  get:[...],
  post:[...],
  put:[...],
  delete:[...],
});

//format:
//{"/enpoint",method}
```

- function explicite

```js
{
  "/join": (req, res) => res.send("something");
}
```

- service method

  - passing function `fn expression`

    if your method doesn't use any `this` inside the method. ex: `this.something`

```js
{
  "/join": service.join;
}
```

using context
if your method use any `this`

- option A `calling methond inside function`

```js
{
  "/join":(req, res) => service.join(res, req);
}
```

- option B `bind`

```js
{
  "/join":service.join.bind(service);
}
```

## using router

- use as middleware for express app / router

```js
//use spread
app.use(...new SampleRouter.handler());
router.use(...new SampleRouter.handler());

//manual
const sample = new SampleRouter();
app.use(sample.handler[0], sample.handler[1]);

//different endpoint
app.use("/new_url", sample.handler[1]);
```

- as subroute of router

```js
...
sub: [
  //explicit
  { "/endpoint": sample.handler[1] },
  //or
  { [sample.handler[0]]: sample.handler[1] },
];
```

---

# views

use `htmx` and `ejs`

read the docs here:
