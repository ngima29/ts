'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('investments', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      slug: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      type: {
        type: Sequelize.ENUM(
          'bond',
          'commodity',
          'mutualFund',
          'others',
          'realEstate',
          'sip',
          'stock'
        ),
        allowNull: false,
      },
      amount:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      date: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    await queryInterface.addIndex('investments', ['slug', 'type'], {
      unique: true,
      name: 'investments_slug_type',
      where: {
        deletedAt: null,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove investments table and its index
    await queryInterface.removeIndex('investments', 'investments_slug_type');
    await queryInterface.dropTable('investments');
  },
};
