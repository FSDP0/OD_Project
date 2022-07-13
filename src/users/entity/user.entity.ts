import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity()
export class User {
   @PrimaryGeneratedColumn({ type: "int" })
   id: number;

   @PrimaryColumn({ type: "varchar" })
   userId: string;

   @Column({ type: "varchar" })
   userPassword: string;

   @PrimaryColumn({ type: "varchar" })
   userEmail: string;

   @Column({ type: "varchar" })
   userName: string;

   @Column({ type: "date" })
   regDate: Date;

   @Column({ type: "boolean", default: true })
   isActive: boolean;
}
