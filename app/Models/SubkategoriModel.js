import { BaseModel, type } from "./BaseModel.js";

export class SubkategoriModel extends BaseModel {
  static tableName = "sub_kategori";
  static tableFields = {
    id_subkat: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    nama_sub: type.STRING,
  };
}
