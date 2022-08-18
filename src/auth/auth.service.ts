import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import * as bcrypto from "bcrypt";

import { Token_Payload } from "../common/interface/payload.interface";

import {
   UserDto,
   CreateUserDto,
   LoginUserDto,
   UpdateUserDto,
} from "../users/dto/user.dto";

import { UsersService } from "../users/users.service";

@Injectable()
export class AuthService {
   constructor(
      private usersService: UsersService,
      private jwtService: JwtService,
   ) {}

   async registUser(dto: CreateUserDto): Promise<UserDto> {
      let userFind_with_Email: UserDto = await this.usersService.findByFields({
         where: { userEmail: dto.userEmail },
      });
      let userFind_with_Id: UserDto = await this.usersService.findByFields({
         where: { userId: dto.userId },
      });

      if (userFind_with_Id || userFind_with_Email) {
         if (userFind_with_Id && userFind_with_Email)
            throw new HttpException(
               "User already exist!",
               HttpStatus.BAD_REQUEST,
            );
         if (userFind_with_Id)
            throw new HttpException(
               "User Id already exist!",
               HttpStatus.BAD_REQUEST,
            );
         if (userFind_with_Email)
            throw new HttpException(
               "User Email already exist!",
               HttpStatus.BAD_REQUEST,
            );
      }

      return this.usersService.saveUser(dto);
   }

   async loginUser(
      dto: LoginUserDto,
   ): Promise<{ access_token: string } | undefined> {
      const userFind: UserDto = await this.usersService.findByFields({
         where: { userId: dto.userId },
      });

      const payload: Token_Payload = {
         userId: userFind.userId,
         userName: userFind.userName,
      };

      return { access_token: this.jwtService.sign(payload) };
   }

   async updateUser(dto: UpdateUserDto) {
      let userFind_with_Email: UserDto = await this.usersService.findByFields({
         where: { userEmail: dto.userEmail },
      });

      if (!userFind_with_Email) {
         throw new HttpException("User Not Exist", HttpStatus.BAD_REQUEST);
      }

      await this.usersService.updateUser(dto);
   }

   async deleteUser(id: string) {
      let userFind = await this.usersService.findByFields({
         where: { userId: id },
      });

      if (!userFind) {
         throw new HttpException("User Not Exist", HttpStatus.BAD_REQUEST);
      }

      await this.usersService.deleteUser(id);
   }

   async validateUser(Id: string, Password: string): Promise<any> {
      let userFind: UserDto = await this.usersService.findByFields({
         where: { userId: Id },
      });

      if (!userFind) return null;

      const validatePassword: boolean = await bcrypto.compare(
         Password,
         userFind.userPassword,
      );

      if (!validatePassword) return null;

      const { userPassword, ...result } = userFind;

      return result;
   }
}
