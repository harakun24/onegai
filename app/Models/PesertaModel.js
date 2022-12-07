/** @format */

import { BaseModel, type } from "./BaseModel.js";

export class PesertaModel extends BaseModel {
  static tableName = "peserta";
  static tableFields = {
    id_peserta: { type: type.INTEGER, primaryKey: true, autoIncrement: true },
    nim: type.STRING(10),
    nama_peserta: type.STRING,
    status: type.STRING,
  };
}
