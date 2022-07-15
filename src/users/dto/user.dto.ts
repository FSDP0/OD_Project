import { PartialType } from "@nestjs/mapped-types";
import {
   IsString,
   IsEmail,
   IsNotEmpty,
   MinLength,
   MaxLength,
   Matches,
   IsOptional,
} from "class-validator";

export class UserDto {
   readonly userId: string;

   readonly userName: string;

   readonly userPassword: string;

   readonly userEmail: string;
}

export class CreateUserDto {
   @IsString()
   @IsNotEmpty()
   @MinLength(5, { message: "ID Length : 5 ~ 30" })
   @MaxLength(30, { message: "ID Length : 5 ~ 30" })
   readonly userId: string;

   @IsString()
   @IsNotEmpty()
   @MinLength(1, { message: "Name Length : 1 ~ 20" })
   @MaxLength(20, { message: "Name Length : 1 ~ 20" })
   readonly userName: string;

   @IsString()
   @IsNotEmpty()
   @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/, {
      message: "비밀번호 양식에 맞게 입력하세요.",
   })
   userPassword: string;

   @IsEmail()
   @IsNotEmpty()
   @MaxLength(60, { message: "Email Maximum Length : 30" })
   readonly userEmail: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class LoginUserDto {
   @IsString()
   @IsOptional()
   @MinLength(5, { message: "ID Length : 5 ~ 30" })
   @MaxLength(30, { message: "ID Length : 5 ~ 30" })
   readonly userId: string;

   @IsEmail()
   @IsOptional()
   @MaxLength(60, { message: "Email Maximum Length : 30" })
   readonly userEmail: string;

   @IsString()
   @IsNotEmpty()
   @Matches(/^[A-Za-z\d!@#$%^&*()]{8,30}$/, {
      message: "비밀번호 양식에 맞게 입력하세요.",
   })
   readonly userPassword: string;
}
