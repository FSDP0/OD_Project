import {
   Get,
   Post,
   Patch,
   Delete,
   Req,
   Res,
   Body,
   Controller,
   UseGuards,
   // Logger,
} from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";

import { Request, Response } from "express";

import { LocalAuthGuard } from "./guard/local-auth.guard";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";

import { AuthService } from "./auth.service";
// import { UsersService } from "../users/users.service";

import {
   CreateUserDto,
   LoginUserDto,
   UpdateUserDto,
} from "../users/dto/user.dto";

@Controller("auth")
export class AuthController {
   constructor(
      private readonly authService: AuthService, // private readonly usersService: UsersService, // private readonly configService: ConfigService,
   ) {}

   @Post("Regist")
   async createUser(
      @Req() req: Request,
      @Body() dto: CreateUserDto,
   ): Promise<any> {
      return await this.authService.registUser(dto);
   }

   @UseGuards(LocalAuthGuard)
   @Post("Login")
   async loginUser(
      @Req() req: Request,
      // @Res() res: Response,
      @Body() dto: LoginUserDto,
   ): Promise<any> {
      // const jwt = await this.authService.loginUser(dto);

      // res.setHeader("Authorization", "Bearer " + jwt.access_token);

      // res.cookie("jwt", jwt.access_token, {
      //    httpOnly: true,
      //    maxAge: 24 * 60 * 60 * 1000, // 1 Day
      // });

      // return res.send({ message: "Login Success" });

      return this.authService.loginUser(dto);
   }

   @UseGuards(JwtAuthGuard)
   @Patch("Update")
   async UpdateUser(
      @Req() req: Request,
      @Body() dto: UpdateUserDto,
   ): Promise<any> {
      return await this.authService.updateUser(dto);
   }

   @UseGuards(JwtAuthGuard)
   @Delete("Delete")
   async deleteUser(@Req() req: Request): Promise<any> {
      return await this.authService.deleteUser(req.user.userId);
   }

   @UseGuards(JwtAuthGuard)
   @Get("Profile")
   getProfile(@Req() req: Request) {
      return req.user;
   }
}
