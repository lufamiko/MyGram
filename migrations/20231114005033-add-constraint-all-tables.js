'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addConstraint("Photos", {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_id_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    await queryInterface.addConstraint("Comments", {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_id_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    await queryInterface.addConstraint("SocialMedia", {
      fields: ["UserId"],
      type: "foreign key",
      name: "user_id_fk",
      references: {
        table: "Users",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });

    await queryInterface.addConstraint("Comments", {
      fields: ["PhotoId"],
      type: "foreign key",
      name: "photo_id_fk",
      references: {
        table: "Photos",
        field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeConstraint("Photos", "user_id_fk");
    await queryInterface.removeConstraint("Comments", "user_id_fk");
    await queryInterface.removeConstraint("SocialMedias", "user_id_fk");
    await queryInterface.removeConstraint("Comments", "photo_id_fk");
    await queryInterface.dropTable("Photos");
    await queryInterface.dropTable("Comments");
    await queryInterface.dropTable("SocialMedias");
    await queryInterface.dropTable("Users");
  }
};
