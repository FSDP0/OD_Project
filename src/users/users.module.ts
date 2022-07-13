import { Module } from "@nestjs/common";

import { DatabaseModule } from "../config/database/database.module";

import { UserRepository } from "./repo/user.repository";

import { UsersService } from "./users.service";

@Module({
   imports: [DatabaseModule],
   providers: [...UserRepository, UsersService],
   exports: [UsersService],
})
export class UsersModule {}
