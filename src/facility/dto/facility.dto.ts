import {} from "@nestjs/mapped-types";
import {
   IsString,
   IsOptional,
   IsNotEmpty,
   MinLength,
   MaxLength,
} from "class-validator";

export class FacilityDto {
   readonly facilityUUID: string;

   readonly facilityCategory: string;

   readonly facilityName: string;

   readonly facilityAddress: string;

   readonly facilityNumber: number;
}

export class CreateFacilityDto {
   @IsString()
   @IsNotEmpty()
   @MinLength(2, { message: "Category ID Length : 2 ~ 16" })
   @MaxLength(16, { message: "Category ID Length : 2 ~ 16" })
   readonly facilityCategory: string;

   @IsString()
   @IsNotEmpty()
   //    @MinLength(2, { message: "Name Length : 2 ~ 30" })
   @MaxLength(30, { message: "Name Maximum Length : 2 ~ 30" })
   readonly facilityName: string;

   @IsString()
   @IsNotEmpty()
   @MinLength(100, { message: "Address Maximum Length" })
   readonly facilityAddress: string;

   @IsString()
   @IsNotEmpty()
   readonly facilityNumber: number;
}
