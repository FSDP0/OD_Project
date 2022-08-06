import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
   @PrimaryGeneratedColumn({ type: "int", comment: "사용자 계정 순번" })
   id: number;

   @PrimaryColumn({ type: "varchar", length: 30, comment: "사용자 아이디" })
   userId: string;

   @Column({ type: "varchar", length: 100, comment: "사용자 비밀번호" })
   userPassword: string;

   @PrimaryColumn({
      type: "varchar",
      length: 60,
      comment: "사용자 이메일 주소",
   })
   userEmail: string;

   @Column({ type: "varchar", length: 20, comment: "사용자 이름" })
   userName: string;

   @Column({ type: "date", comment: "사용자 계정 등록일" })
   regDate: Date;

   @Column({
      type: "date",
      nullable: true,
      default: null,
      comment: "사용자 계정정보 수정일",
   })
   modDate?: Date;
}
