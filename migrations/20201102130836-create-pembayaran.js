'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('pembayaran', {
      id_pembayaran: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tagihan: {
        type: Sequelize.INTEGER,
        references: {
          model: 'tagihan',
          key: 'id_tagihan'
        }
      },
      tanggal_pembayaran: {
        type: Sequelize.DATE
      },
      biaya_admin: {
        type: Sequelize.INTEGER
      },
      total_bayar: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: 0
      },
      bukti: {
        type: Sequelize.STRING
      },
      id_admin: {
        type: Sequelize.INTEGER,
        references: {
          model: 'admin',
          key: 'id_admin'
        }
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
    await queryInterface.dropTable('pembayaran');
  }
};