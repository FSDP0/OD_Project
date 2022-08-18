import { Inject, Injectable } from "@nestjs/common";

import { FindOneOptions, Repository } from "typeorm";

import { Facility } from "./entity/facility.entity";

@Injectable()
export class FacilityService {
   constructor(
      @Inject("FACILITY_REPOSITORY")
      private facilityRepository: Repository<Facility>,
   ) {}

   async findByFields(): // options:FindOneOptions<>
   Promise<undefined> {
      // return await this.facilityRepository.findOne();

      return null;
   }
}
