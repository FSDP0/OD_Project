import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";

import { Strategy } from "passport-local";

import { AuthService } from "../auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
   constructor(private authService: AuthService) {
      super({ usernameField: "userId", passwordField: "userPassword" });
   }

   // @override
   async validate(userId: string, userPassword: string): Promise<any> {
      const user = await this.authService.validateUser(userId, userPassword);

      if (!user) {
         throw new UnauthorizedException();
      }

      return user;
   }
}
