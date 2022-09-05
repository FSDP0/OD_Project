import { DataSource } from "typeorm";
import { User } from "../entity/user.entity";

export const UserRepository = [
   {
      provide: "USER_REPOSITORY",
      useFactory: (dataSource: DataSource) =>
         dataSource.getRepository(User).find({
            relations: {},
         }),
      inject: ["DATA_SOURCE"],
   },
];
