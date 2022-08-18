import { DataSource } from "typeorm";
import { Facility } from "../entity/facility.entity";

export const FacilityRepository = [
   {
      provide: "FACILITY_REPOSITORY",
      useFactory: (dataSource: DataSource) =>
         dataSource.getRepository(Facility),
      inject: ["DATA_SOURCE"],
   },
];
