'use strict';

const penggunaan = require("../models/penggunaan");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tagihan', {
      id_tagihan: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_penggunaan: {
        type: Sequelize.INTEGER,
        references: {
          model: 'penggunaan',
          key: 'id_pengunaan'
        }
      },
      bulan: {
        type: Sequelize.STRING
      },
      tahun: {
        type: Sequelize.STRING
      },
      jumlah_meter: {
        type: Sequelize.FLOAT
      },
      status: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tagihan');
  }
};