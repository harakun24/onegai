import { writeFileSync } from "fs";
import Model from "./Models/index.js";
import erd from "sequelize-erd";

const db = Model.driver;

const img = await erd({ source: db });

writeFileSync("./erd.svg", img);
