"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class tarif extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  tarif.init(
    {
      daya: DataTypes.STRING,
      tarifperkwh: DataTypes.FLOAT,
      id_tarif: {
        type: DataTypes.INTEGER,
        autoIncrement: true,        
        primaryKey: true,
      },
    },
    {
      sequelize,
      modelName: "tarif",
      tableName: "tarif",
    }
  );
  return tarif;
};
