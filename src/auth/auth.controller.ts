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
   HttpStatus,
   HttpException,
} from "@nestjs/common";
// import { ConfigService } from "@nestjs/config";

import { Request, Response } from "express";

import { LocalAuthGuard } from "./guard/local-auth.guard";
import { JwtAuthGuard } from "./guard/jwt-auth.guard";
import { RolesGuard } from "./guard/roles.guard";

import { Roles } from "../common/decorator/roles.decorator";
import { Role } from "../common/enum/roles.enum";

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
      @Res() res: Response,
      @Body() dto: CreateUserDto,
   ): Promise<any> {
      let result = await this.authService.registUser(dto);

      res.status(HttpStatus.CREATED).json({
         user: result,
         message: "Create User OK",
      });
   }

   @UseGuards(LocalAuthGuard)
   @Post("Login")
   async loginUser(
      @Res() res: Response,
      @Body() dto: LoginUserDto,
   ): Promise<any> {
      const jwt = await this.authService.loginUser(dto);

      res.setHeader("Authorization", "Bearer " + jwt.access_token);

      res.cookie("jwt", jwt.access_token, {
         httpOnly: true,
         maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(HttpStatus.OK).json({
         message: "Login User OK",
      });
   }

   @UseGuards(JwtAuthGuard)
   @Get("Logout")
   async logoutUser(@Res() res: Response) {
      res.cookie("jwt", "", {
         maxAge: 0,
      });

      res.removeHeader("Authorization");

      return res.status(HttpStatus.OK).json({
         message: "Logout User OK",
      });
   }

   @UseGuards(JwtAuthGuard)
   @Patch("Update")
   async UpdateUser(
      @Res() res: Response,
      @Body() dto: UpdateUserDto,
   ): Promise<any> {
      await this.authService.updateUser(dto);

      return res.status(HttpStatus.OK).json({ message: "Update User OK" });
   }

   @UseGuards(JwtAuthGuard)
   @Delete("Delete")
   async deleteUser(@Req() req: Request, @Res() res: Response): Promise<any> {
      await this.authService.deleteUser(req.user.userId);

      return res.status(HttpStatus.OK).json({
         message: "Delete User OK",
      });
   }

   @UseGuards(JwtAuthGuard)
   @Get("Profile")
   getProfile(@Req() req: Request, @Res() res: Response) {
      try {
         if (req.user) {
            res.status(HttpStatus.OK).json({
               message: "Show User Profile",
               user: req.user,
            });
         } else {
            res.status(HttpStatus.FORBIDDEN).json({
               message: "User Profile Not Found",
            });
         }
      } catch {
         throw new HttpException(
            "Internal Server Error",
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }
}
