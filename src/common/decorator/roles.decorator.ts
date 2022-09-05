import { SetMetadata } from "@nestjs/common";
import { Role } from "../enum/roles.enum";

export type AllowedRole = keyof typeof Role | "Any";

export const ROLES_KEY = "roles";
export const Roles = (...roles: AllowedRole[]) => SetMetadata(ROLES_KEY, roles);

// import { SetMetadata } from "@nestjs/common";
// import { Role } from "../enum/roles.enum";

// export const ROLES_KEY = "roles";
// export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
