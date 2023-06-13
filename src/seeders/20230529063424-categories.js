/* eslint-disable */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "categories",
      [
        {
          name: "Foods and Drinks",
          slug: "Foods-and-Drinks",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Transportation",
          slug: "Transportation",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Entertainment",
          slug: "member",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Health",
          slug: "Health",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Education",
          slug: "Education",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Debt Payments",
          slug: "Debt-Payments",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Housing",
          slug: "Housing",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Miscellaneous Expenses",
          slug: "Miscellaneous-Expenses",
          type: "expenses",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
       // ############## income categories ##################33
        {
          name: "Salary",
          slug: "Salary",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Investment Income",
          slug: "Investment-Income",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Retirement Income",
          slug: "Retirement-Income",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Miscellaneous Income",
          slug: "Miscellaneous-Income",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Stock Bonus",
          slug: "Stock-Bonus",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Sell Commodity",
          slug: "Sell-Commodity",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "Sell RealEstate Properties",
          slug: "Sell-RealEstate-Properties",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },{
          name: "SIP Return",
          slug: "SIP-Return",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Sell Bonds",
          slug: "Sell-Bonds",
          type: "income",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("categories", [], {});
  },
};
