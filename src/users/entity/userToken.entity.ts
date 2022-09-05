import {
   Entity,
   Column,
   PrimaryColumn,
   PrimaryGeneratedColumn,
   OneToOne,
   JoinColumn,
} from "typeorm";

import { User } from "./user.entity";

@Entity()
export class UserToken {
   @PrimaryGeneratedColumn()
   id: number;

   // @PrimaryColumn({ type: "varchar", length: 30, comment: "사용자 아이디" })
   // userId: string;
   @OneToOne(() => User, (user) => user.userId, {
      nullable: false,
      onDelete: "CASCADE",
      cascade: true,
   })
   @JoinColumn({ name: "userId" })
   userId!: User;

   @Column({ type: "varchar", length: 200, comment: "사용자 토큰" })
   userRegistToken!: string;

   @Column({ type: "varchar", length: 200, comment: "사용자 토큰" })
   userRefreshToken?: string;
}
