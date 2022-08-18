import { Module } from "@nestjs/common";

import { DatabaseModule } from "../config/database/database.module";

import { FacilityRepository } from "./repo/facility.repository";

@Module({
   imports: [DatabaseModule],
   providers: [...FacilityRepository],
   exports: [],
})
export class FacilityModule {}
