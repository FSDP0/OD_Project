import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import { Token_Payload } from "../../common/interface/payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   constructor(configService: ConfigService) {
      super({
         // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
         jwtFromRequest: ExtractJwt.fromExtractors([
            (req) => {
               return req?.cookies?.jwt;
            },
         ]),
         ignoreExpiration: false,
         secretOrKey: configService.get<string>("SECRET_KEY"),
      });
   }

   // @override
   async validate(payload: Token_Payload) {
      return { userId: payload.userId, userName: payload.userName };
   }
}
