import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from "typeorm";

@Entity("replies")
export class Replies {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 22 })
  guild!: string;

  @Column({ type: "varchar", length: 22 })
  user!: string;

  @Column({ type: "string", array: true })
  sender!: string[];
}
