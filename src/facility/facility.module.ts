import { Module } from "@nestjs/common";

import { DatabaseModule } from "../config/database/database.module";

import { FacilityRepository } from "./repo/facility.repository";

import { FacilityService } from "./facility.service";

@Module({
   imports: [DatabaseModule],
   providers: [...FacilityRepository, FacilityService],
   exports: [FacilityService],
})
export class FacilityModule {}
