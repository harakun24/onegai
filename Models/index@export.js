import { writeFileSync } from "fs";
import Model from "./index.js";
import erd from "sequelize-erd";

const db = Model.driver;
const names = process.argv.slice(2)[0];

const img = await erd({ source: db });

writeFileSync(names, img);
