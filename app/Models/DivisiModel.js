import { BaseModel, type } from "./BaseModel.js";

export class DivisiModel extends BaseModel {
  static tableName = "divisi";
  static tableFields = {
    id_divisi: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    nama_divisi: type.STRING,
  };
}
