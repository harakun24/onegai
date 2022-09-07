import { BaseModel, type } from "./BaseModel.js";
//const { INTEGER, STRING } = type;

export class PostModel extends BaseModel {
  static table = "post";
  static fields = {
    postId: { type: type.INTEGER, autoIncrement: true, primaryKey: true },
    content: type.STRING,
    userKey: type.INTEGER,
  };
}
