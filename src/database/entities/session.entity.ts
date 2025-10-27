import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("sessions")
export class Session {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 500 })
  token: string;

  @Column({ type: "timestamp", nullable: true })
  expires_at: Date;

  @Column({ type: "varchar", length: 100, nullable: true })
  ip_address: string;

  @Column({ type: "text", nullable: true })
  user_agent: string;

  @Column({ type: "int", nullable: true })
  user_id: number;

  @ManyToOne(() => User, (user) => user.sessions, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
