import denv from "dotenv";
import Sequelize from "sequelize";
import { dir, path } from "../../path.js";
import "colors";
import * as listModel from "./model@list.js";

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
    for (const name in listModel) {
      listModel[name].connect(this.#driver);
      console.log(` [`.gray + `___ ${name}___`.bgGray.black + `]`.gray);
    }
  }
  get driver() {
    return this.#driver;
  }
}
