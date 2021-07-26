import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("birthdays")
export class Birthdays {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 22 })
  user!: string;

  @Column({ type: "date"})
  date!: Date;
}