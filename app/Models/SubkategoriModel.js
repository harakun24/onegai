import { BaseModel, type } from "./BaseModel.js";

export class SubkategoriModel extends BaseModel {
  static tableName = "sub_kategori";
  static tableFields = {
    id_sub: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    nama_sub: type.STRING,
  };
}
