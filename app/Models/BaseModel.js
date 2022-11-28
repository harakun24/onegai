import { Model } from "sequelize";

export class BaseModel extends Model {
  static connect(sequelize) {
    this.init(this.tableFields, {
      sequelize,
      modelName: this.tableName,
    });
  }
}

export { DataTypes as type } from "sequelize";
