import { DataSource } from "typeorm";
import { User } from "../../users/entity/user.entity";

export const databaseProviders = [
   {
      provide: "DATA_SOURCE",
      useFactory: async () => {
         const dataSource = new DataSource({
            type: "mariadb",
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [User],
            synchronize: true,
         });

         return dataSource.initialize();
      },
   },
];
