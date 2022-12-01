import { BaseModel, type } from "./BaseModel.js";

export class KategoriModel extends BaseModel {
  static tableName = "kategori";
  static tableFields = {
    id_kategori: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    nama_kategori: type.STRING,
  };
}
