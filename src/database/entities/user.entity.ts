import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Link, File, Session } from "./index.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 225 })
  name: string;

  @Column({ type: "varchar", length: 225, unique: true })
  email: string;

  @Column({ type: "timestamp", nullable: true })
  email_verified: Date;

  @Column({ type: "varchar", length: 225 })
  password: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  avatar: string;

  @Column({ type: "varchar", length: 225, nullable: true })
  phone_no: string;

  @OneToMany(() => Link, (link) => link.user)
  links: Link[];

  @OneToMany(() => File, (file) => file.user)
  files: File[];

  @OneToMany(() => Session, (session) => session.user)
  sessions: Session[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
