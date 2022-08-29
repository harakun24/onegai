console.log(`preparing Controller-cli`);

import fs from "fs";
import path from "path";
import { fileURLToPath as file } from "url";
const dir = path.dirname(file(import.meta.url));
const Model = process.argv.slice(2)[0];
let i = 0;
const m = Model.split("")
  .map((t) => (i++ < 1 ? t.toUpperCase() : t))
  .reduce((a, b) => `${a}${b}`);
const str = `import { BaseController } from "./BaseController.js";

export class ${m}Controller extends BaseController {
  constructor() {
    super("${Model}");
  }
  index(res) {}
}
`;

try {
  await fs.writeFileSync(
    path.resolve(dir, `../Controllers/${m}Controller.js`),
    str
  );
  console.log(`created Controller:${m}`);
} catch (err) {
  console.log(err.message);
}
