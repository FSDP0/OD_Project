import { Inject, Injectable, Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { FindOneOptions, Repository } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "./entity/user.entity";

import { UserDto, CreateUserDto, UpdateUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
   constructor(
      @Inject("USER_REPOSITORY")
      private userRepository: Repository<User>,
      private configService: ConfigService,
   ) {}

   async findByFields(
      options: FindOneOptions<UserDto>,
   ): Promise<UserDto | undefined> {
      const user = await this.userRepository.findOne(options);

      if (!user.isActive) return undefined;

      return user;
   }

   async saveUser(dto: CreateUserDto): Promise<UserDto | undefined> {
      await this.setPassword(dto);

      let date = new Date();

      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);

      const regDate = year + "-" + month + "-" + day;

      const userInfo = { ...dto, regDate: regDate };

      return await this.userRepository.save(userInfo);
   }

   async updateUser(dto: UpdateUserDto): Promise<String | undefined> {
      await this.setPassword(dto);

      let date = new Date();

      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);

      const modDate = year + "-" + month + "-" + day;

      await this.userRepository.update(
         { userEmail: dto.userEmail },
         {
            userId: dto.userId,
            userName: dto.userName,
            userPassword: dto.userPassword,
            modDate: modDate,
         },
      );

      return "Update User Success";
   }

   async deleteUser(id: string): Promise<String | undefined> {
      let date = new Date();

      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);

      const delDate = year + "-" + month + "-" + day;

      await this.userRepository.update(
         {
            userId: id,
         },
         {
            delDate: delDate,
            isActive: false,
         },
      );

      // await this.userRepository.delete({ userId: id });

      return "Delete User Success";
   }

   private async setPassword(
      dto: CreateUserDto | UpdateUserDto,
   ): Promise<void> {
      const salt = parseInt(this.configService.get("SALT"));

      dto.userPassword = await bcrypt.hash(dto.userPassword, salt);

      return Promise.resolve();
   }
}
