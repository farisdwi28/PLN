'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.level,{
        foreignKey: 'id_level',
        as: 'level'
      })
    }
  };
  admin.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    nama_admin: DataTypes.STRING,
    id_level: DataTypes.INTEGER,
    id_admin: {
      type : DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    }
  }, {
    sequelize,
    modelName: 'admin',
    tableName: 'admin'
  });
  return admin;
};