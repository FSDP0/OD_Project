// import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
// import { Reflector } from "@nestjs/core";

// // import { User } from "../../users/entity/user.entity";
// import {UserRole} from "@user/entity/userRole.entity";
// import { AllowedRole, ROLES_KEY } from "../../common/decorator/roles.decorator";

// @Injectable()
// export class RolesGuard implements CanActivate {
//    constructor(private reflector: Reflector) {}

//    canActivate(context: ExecutionContext): boolean {
//       const requiredRoles = this.reflector.get<AllowedRole>(
//          ROLES_KEY,
//          context.getHandler(),
//       );

//       if (!requiredRoles) {
//          return true;
//       }

//       const request = context.switchToHttp().getRequest();
//       const user: User = request["user"];

//       if (!user) return false;
//       if (requiredRoles.includes("Any")) return true;
//       return requiredRoles.includes();
//    }
// }

// // import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
// // import { Reflector } from "@nestjs/core";

// // import { Role } from "../../common/enum/roles.enum";
// // import { ROLES_KEY } from "../../common/decorator/roles.decorator";

// // @Injectable()
// // export class RolesGuard implements CanActivate {
// //    constructor(private reflector: Reflector) {}

// //    canActivate(context: ExecutionContext): boolean {
// //       const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
// //          ROLES_KEY,
// //          [context.getHandler(), context.getClass()],
// //       );

// //       if (!requiredRoles) {
// //          return true;
// //       }

// //       const { user } = context.switchToHttp().getRequest();

// //       return requiredRoles.some((role) => user.roles?.include(role));
// //    }
// // }
