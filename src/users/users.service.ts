import { Inject, Injectable } from "@nestjs/common";
import { FindOneOptions, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "./entity/user.entity";

import { UserDto, CreateUserDto, UpdateUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
   constructor(
      @Inject("USER_REPOSITORY")
      private userRepository: Repository<User>,
   ) {}

   async findByFields(
      options: FindOneOptions<UserDto>,
   ): Promise<UserDto | undefined> {
      return this.userRepository.findOne(options);
   }

   async saveUser(dto: CreateUserDto): Promise<UserDto | undefined> {
      await this.setPassword(dto);

      let date = new Date();

      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDay()).slice(-2);

      const regDate = year + "-" + month + "-" + day;

      const userInfo = { ...dto, regDate: regDate };

      return await this.userRepository.save(userInfo);
   }

   private async setPassword(dto: CreateUserDto): Promise<void> {
      const salt = 10;
      dto.userPassword = await bcrypt.hash(dto.userPassword, salt);

      return Promise.resolve();
   }

   async remove(dto: UserDto): Promise<String | undefined> {
      await this.userRepository.delete(dto.userId);

      return "Delete User Success";
   }
}
