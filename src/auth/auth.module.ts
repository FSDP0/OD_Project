import { Module } from "@nestjs/common";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";

import { DatabaseModule } from "../config/database/database.module";

import { LocalStrategy } from "./strategy/local.strategy";
import { JwtStrategy } from "./strategy/jwt.strategy";

import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";

import { UsersModule } from "../users/users.module";
import { UsersService } from "../users/users.service";
import { UserRepository } from "../users/repo/user.repository";

@Module({
   imports: [
      UsersModule,
      DatabaseModule,
      PassportModule,
      ConfigModule,
      JwtModule.registerAsync({
         imports: [ConfigModule],
         useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>("SECRET_KEY"),
            signOptions: { expiresIn: "1d" },
         }),
         inject: [ConfigService],
      }),
   ],
   exports: [DatabaseModule, AuthService],
   controllers: [AuthController],
   providers: [
      ...UserRepository,
      UsersService,
      AuthService,
      LocalStrategy,
      JwtStrategy,
   ],
})
export class AuthModule {}
