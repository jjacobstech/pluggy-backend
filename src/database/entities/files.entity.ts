import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from "typeorm";
import { User } from "./user.entity";

@Entity("files")
export class File {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 225 })
  file_name: string;

  @Column({ type: "varchar", length: 225 })
  file_path: string;

  @Column({ type: "varchar", length: 225 })
  file_format: string;

  @Column({ type: "varchar", length: 225 })
  file_type: string;

  @Column({ type: "bigint" })
  file_size: number;

  @ManyToOne(() => User, (user) => user.files, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
