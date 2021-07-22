import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("replies")
export class Replies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 22 })
  guild!: string;

  @Column({ type: "varchar", length: 22 })
  user!: string;

  @Column({ type: "text", length: 122 })          //array functionality to be added in the future
  roast!: string;
}
