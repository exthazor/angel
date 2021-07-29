import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("getbirthdays")
export class GetBirthdays {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 22 })
  user!: string;

  @Column({ type: "varchar", length: 22 })
  date!: string;

  @Column({ type: "int", nullable: true})
  month!: number;
}