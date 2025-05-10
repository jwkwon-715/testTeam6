'use strict';

// migrations/xxxxxx-create-users-table.js
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false,
        unique: true,
        comment: "사용자 ID",
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "비밀번호",
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "전화번호",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
        comment: "이메일 주소",
      },
      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        comment: "생년월일",
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('users');
  }
};

