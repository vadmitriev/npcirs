'use strict';
import * as fs from 'fs';
import { join } from 'path';

import './init/init.sql';

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return fs
      .readFile(join('./init', 'init.sql'))
      .then((sql) => queryInterface.sql(sql.toString()));
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('"public"."r1022"');
  },
};
