'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('goals', {
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
          'expenses',
          'income',
          'investment',
          'others'
        ),
        allowNull: false,
      },
      startDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      endDate: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      totalAmount: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      currentAmount: {
        type : Sequelize.INTEGER,
        allowNull: false,
      },
      remarks: {
        type: Sequelize.TEXT,
        allowNull: true,
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

    // Add index with unique constraint on slug, type, startDate, and endDate columns
    await queryInterface.addIndex('goals', ['slug', 'type', 'startDate', 'endDate'], {
      unique: true,
      name: 'goals_slug_type_start_date_end_date',
      where: {
        deletedAt: null,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove index on slug, type, startDate, and endDate columns
    await queryInterface.removeIndex('goals', 'goals_slug_type_start_date_end_date');

    // Drop goals table
    await queryInterface.dropTable('goals');
  },
};
