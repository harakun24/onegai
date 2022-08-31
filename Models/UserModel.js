import { BaseModel, type } from "./BaseModel.js";
const { INTEGER, STRING } = type;

export class UserModel extends BaseModel {
  static table = "user";
  static fields = {
    userID: { type: INTEGER, primaryKey: true, autoIncrement: true },
    name: STRING,
    gender: type.ENUM("male", "female"),
  };
}
