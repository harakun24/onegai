console.log(`preparing Model-cli`);

import fs from "fs";
import path from "path";
import { fileURLToPath as file } from "url";
const dir = path.dirname(file(import.meta.url));
const Model = process.argv.slice(2)[0];
let i = 0;
const m = Model.split("")
  .map((t) => (i++ < 1 ? t.toUpperCase() : t))
  .reduce((a, b) => `${a}${b}`);
const str = `import { BaseModel, type } from "./BaseModel.js";
//const { INTEGER, STRING } = type;

export class ${m}Model extends BaseModel {
  static table = "${Model}";
  static fields = {
  };
}`;

try {
  await fs.writeFileSync(path.resolve(dir, `../Models/${m}Model.js`), str);
  let list = await fs
    .readFileSync(path.resolve(dir, "../Models/index@list.js"))
    .toString();
  list += `export { ${m}Model as ${m} } from "./${m}Model.js";`;
  console.log(`created Model:${m}`);
  await fs.writeFileSync(path.resolve(dir, "../Models/index@list.js"), list);

  console.log(`listed to model`);
} catch (err) {
  console.log(err.message);
}
