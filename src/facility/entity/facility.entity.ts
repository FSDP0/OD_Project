import { PrimaryColumn } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Facility {
   @PrimaryGeneratedColumn({ type: "int", comment: "시설 등록 순번" })
   id: number;

   @PrimaryColumn({ type: "varchar", comment: "UUID" })
   facilityUUID: string;

   @Column({ type: "varchar", comment: "카테고리" })
   facilityCategory: string;

   @Column({ type: "varchar", comment: "요양원 명" })
   facilityName: string;

   @Column({ type: "varchar", comment: "요양원 주소" })
   facilityAddress: string;

   @Column({ type: "int", comment: "요양원 번호" })
   facilityNumber: number;
}
