console.log(`preparing Router-cli`);

import fs from "fs";
import path from "path";
import { fileURLToPath as file } from "url";
const dir = path.dirname(file(import.meta.url));
const Model = process.argv.slice(2)[0];
let i = 0;
const m = Model.split("")
  .map((t) => (i++ < 1 ? t.toUpperCase() : t))
  .reduce((a, b) => `${a}${b}`);
const str = `import { BaseRouter } from "./BaseRouter.js";
//import { ${m}Controller } from "../Controllers/${m}Controller.js";

export class ${m}Router extends BaseRouter {
  #service;
  #list = [
    //list route
    //"/<@get>index",
  ];
  constructor() {
    super("${Model}");
    this.driver = "/${Model}";
    //this.#service = new ${m}Controller();
    //this.bound(this.#list, this.#service);
  }
}
`;

try {
  await fs.writeFileSync(path.resolve(dir, `../Routers/${m}Router.js`), str);
  let list = await fs
    .readFileSync(path.resolve(dir, "../Routers/index.js"))
    .toString();
  list += `export * from "./${m}Router.js";`;
  console.log(`created Router:${m}`);
  await fs.writeFileSync(path.resolve(dir, "../Routers/index.js"), list);

  console.log(`listed to router`);
} catch (err) {
  console.log(err.message);
}
