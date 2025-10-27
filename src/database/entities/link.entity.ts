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

@Entity("links")
export class Link {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 225 })
  url: string;

  @Column({ type: "varchar", length: 225 })
  shortUrl: string;

  @RelationId((link: Link) => link.user)
  user_id?: string;

  @ManyToOne(() => User, (user) => user.links, { onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
