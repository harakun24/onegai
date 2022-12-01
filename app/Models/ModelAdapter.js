import denv from "dotenv";
import Sequelize from "sequelize";
import { dir, path } from "../../path.js";
import * as listModel from "./model@list.js";
import assoc from "./model@assoc.js";

import "colors";

denv.config();

export class ModelAdapter {
  #models = {};
  #driver;

  constructor() {
    const { env } = process;
    this.#driver = new Sequelize(env.db_database, env.db_user, env.db_pass, {
      logging: false,
      host: env.db_host,
      dialect: "sqlite",
      storage: path.resolve(
        dir,
        "./app/database/",
        // "./database.sequelize"
        (env.db_storage || "./database@pub") + ".sqlite"
      ),
    });
    console.log();
    for (const name in listModel) {
      listModel[name].connect(this.#driver);
      console.log(`  @Model :${name}`.cyan);
      this.#models[name] = listModel[name];
    }
    assoc(this.#models);
  }
  get driver() {
    return this.#driver;
  }
  get list() {
    return this.#models;
  }
}
