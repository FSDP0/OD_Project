// import {
//    Column,
//    Entity,
//    JoinColumn,
//    OneToOne,
//    PrimaryColumn,
//    PrimaryGeneratedColumn,
// } from "typeorm";

// import { Role } from "@common/enum/roles.enum";

// import { User } from "./user.entity";

// @Entity()
// export class UserRole {
//    // @PrimaryGeneratedColumn({ type: "int", comment: "사용자 계정 순번" })
//    // id: number;

//    // @PrimaryColumn({ type: "varchar", length: 30, comment: "사용자 아이디" })
//    // userId: string;
//    @OneToOne(() => User, (user) => user.userId, {
//       nullable: false,
//       onDelete: "CASCADE",
//    })
//    @PrimaryColumn()
//    @JoinColumn()
//    userId: User;

//    @Column({ type: "enum", enum: Role, default: Role.None })
//    userRole: Role;
// }
