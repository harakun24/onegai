import { BaseModel, type } from "./BaseModel.js";

export class AdminModel extends BaseModel {
  static tableName = "user";
  static tableFields = {
    userID: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    name: type.STRING,
    password: type.STRING,
  };
}
