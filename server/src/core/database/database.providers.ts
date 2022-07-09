import { Organization } from 'src/modules/organization/organization.entity';
import { Region } from 'src/modules/regions/region.entity';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/user.entity';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { databaseConfig } from './database.config';
import * as fs from 'fs';
import * as path from 'path';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }
      const sequelize = new Sequelize(config);

      const init_sql = fs.readFileSync(
        path.resolve('src', 'assets', 'db', 'init.sql'),
        'utf-8',
      );

      await sequelize.query(init_sql);

      sequelize.addModels([User, Region, Organization]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
