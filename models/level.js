"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class level extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  level.init(
    {
      nama_level: DataTypes.STRING,
      id_level: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "level",
      autoIncrement: true,
      tableName: "level",
    }
  );
  return level;
};
