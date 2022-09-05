import { Inject, Injectable, HttpException, HttpStatus } from "@nestjs/common";

import { FindOneOptions, Repository } from "typeorm";

import { FacilityDto } from "@facility/dto/facility.dto";
import { Facility } from "@facility/entity/facility.entity";
import {} from "@facility/repo/facility.repository";

@Injectable()
export class FacilityService {
   constructor(
      @Inject("FACILITY_REPOSITORY")
      private facilityRepository: Repository<Facility>,
   ) {}

   async findByFields(
      options: FindOneOptions<FacilityDto>,
   ): Promise<FacilityDto | undefined> {
      try {
         return await this.facilityRepository.findOne(options);
      } catch {
         throw new HttpException(
            "Facility Not Found Error",
            HttpStatus.NOT_FOUND,
         );
      }
   }
}
//
