import {
   Post,
   Get,
   Req,
   Body,
   Controller,
   UseGuards,
   Logger,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { Request } from "express";

import { LocalAuthGuard } from "./guard/local-auth.guard";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";

import { AuthService } from "./auth.service";
// import { UsersService } from "../users/users.service";

import { CreateUserDto, LoginUserDto } from "../users/dto/user.dto";

@Controller("auth")
export class AuthController {
   constructor(
      private readonly authService: AuthService,
      // private readonly usersService: UsersService,
      private readonly configService: ConfigService,
   ) {}

   @Post("/Regist")
   async createUser(
      @Req() req: Request,
      @Body() dto: CreateUserDto,
   ): Promise<any> {
      return await this.authService.registUser(dto);
   }

   @UseGuards(LocalAuthGuard)
   @Post("/Login")
   async loginUser(
      @Req() req: Request,
      @Body() dto: LoginUserDto,
   ): Promise<any> {
      return await this.authService.loginUser(dto);
   }

   @UseGuards(JwtAuthGuard)
   @Get("/Profile")
   getProfile(@Req() req: Request) {
      return req.user;
   }

   @Get("/Test")
   getTest() {
      return this.configService.get<string>("DATABASE_NAME");
   }
   // @Post("/U_User")
   // updateUser() {}

   // @Get("/R_User")
   // userList() {}

   // @Delete("/D_User")
   // deleteUser() {}
}
