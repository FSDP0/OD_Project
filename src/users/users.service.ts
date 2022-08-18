import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { FindOneOptions, Repository, DataSource } from "typeorm";
import * as bcrypt from "bcrypt";

import { User } from "./entity/user.entity";

import { UserDto, CreateUserDto, UpdateUserDto } from "./dto/user.dto";

@Injectable()
export class UsersService {
   constructor(
      @Inject("USER_REPOSITORY")
      private userRepository: Repository<User>,
      private configService: ConfigService,
   ) // private dataSource: DataSource,
   {}

   async findByFields(
      options: FindOneOptions<UserDto>,
   ): Promise<UserDto | undefined> {
      try {
         return await this.userRepository.findOne(options);
      } catch {
         throw new HttpException("User Not Found Error", HttpStatus.NOT_FOUND);
      }
   }

   // async saveUser_with_Transaction(
   //    dto: CreateUserDto,
   // ): Promise<UserDto | boolean | undefined> {
   //    await this.setPassword(dto);

   //    let date = new Date();

   //    let year = date.getFullYear();
   //    let month = ("0" + (date.getMonth() + 1)).slice(-2);
   //    let day = ("0" + date.getDate()).slice(-2);

   //    const regDate = year + "-" + month + "-" + day;

   //    const userInfo = { ...dto, regDate: regDate };

   //    const queryRunner = this.dataSource.createQueryRunner();

   //    await queryRunner.connect();
   //    await queryRunner.startTransaction();

   //    try {
   //       await queryRunner.manager.save(userInfo);

   //       await queryRunner.commitTransaction();
   //    } catch (err) {
   //       await queryRunner.rollbackTransaction();
   //    } finally {
   //       await queryRunner.release();

   //       return true;
   //    }
   // }

   async saveUser(dto: CreateUserDto): Promise<UserDto | undefined> {
      await this.setPassword(dto);

      let date = new Date();

      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);

      const regDate = year + "-" + month + "-" + day;

      const userInfo = { ...dto, regDate: regDate };

      try {
         return await this.userRepository.save(userInfo);
      } catch {
         throw new HttpException(
            "Internal Server Error",
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   async updateUser(dto: UpdateUserDto): Promise<boolean | undefined> {
      await this.setPassword(dto);

      let date = new Date();

      let year = date.getFullYear();
      let month = ("0" + (date.getMonth() + 1)).slice(-2);
      let day = ("0" + date.getDate()).slice(-2);

      const modDate = year + "-" + month + "-" + day;

      try {
         await this.userRepository.update(
            { userEmail: dto.userEmail },
            {
               userId: dto.userId,
               userName: dto.userName,
               userPassword: dto.userPassword,
               modDate: modDate,
            },
         );

         return true;
      } catch {
         throw new HttpException(
            "Internal Server Error",
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   async deleteUser(id: string): Promise<boolean | undefined> {
      try {
         await this.userRepository.delete({ userId: id });

         return true;
      } catch {
         throw new HttpException(
            "Internal Server Error",
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }

   private async setPassword(
      dto: CreateUserDto | UpdateUserDto,
   ): Promise<void> {
      const salt = parseInt(this.configService.get("SALT"));

      try {
         dto.userPassword = await bcrypt.hash(dto.userPassword, salt);

         return Promise.resolve();
      } catch {
         throw new HttpException(
            "Internal Server Error",
            HttpStatus.INTERNAL_SERVER_ERROR,
         );
      }
   }
}
