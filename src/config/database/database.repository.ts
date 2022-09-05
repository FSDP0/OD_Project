import { DataSource } from "typeorm";

import { User } from "../../users/entity/user.entity";
// import { UserToken } from "@root/users/entity/userToken.entity";
// import { UserRole } from "@root/users/entity/userRole.entity";

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
            entities: [
               User,
               // UserToken,
               // UserRole
            ],
            synchronize: process.env.NODE_ENV == "development" ? true : false,
            // logging: process.env.NODE_ENV == "development" ? true : false,
         });

         return dataSource.initialize();
      },
   },
];
