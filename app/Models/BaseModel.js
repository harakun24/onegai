import { Model } from "sequelize";

export class BaseModel extends Model {
  static connect(sequelize) {
    this.init(this.fields, {
      sequelize,
      modelName: this.table,
    });
  }
}

export { DataTypes as type } from "sequelize";
