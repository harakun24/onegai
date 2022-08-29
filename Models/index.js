import denv from "dotenv";
import Sequelize from "sequelize";
import * as list from "./index@list.js";
import { default as assoc } from "./index@association.js";
import { dir, path } from "../config/path.js";
import "colors";
denv.config();

class ModelAdapter {
  #models = {};
  #objSql;

  constructor() {
    const { env } = process;
    this.#objSql = new Sequelize(env.Mysql_db, env.Mysql_user, env.Mysql_pass, {
      logging: false,
      host: env.Mysql_host,
      dialect: "sqlite",
      storage: path.resolve(
        dir,
        (env.Mysql_storage || "./db") + `@${Date.now()}.sqlite`
      ),
    });
    console.log();
    for (const l in list) {
      list[l].conn(this.#objSql);
      console.log(` [`.cyan + `___ ${l} ___`.bgCyan.black + `]`.cyan);
      this.#models[l] = list[l];
    }
    assoc(this.#models);
  }
  get list() {
    return this.#models;
  }
  get driver() {
    return this.#objSql;
  }
}

export default new ModelAdapter();
