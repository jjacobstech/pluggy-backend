import { Link, File, Session } from "./index.entity";
export declare class User {
    id: string;
    name: string;
    email: string;
    email_verified: Date;
    password: string;
    avatar: string;
    phone_no: string;
    links: Link[];
    files: File[];
    sessions: Session[];
    created_at: Date;
    updatedAt: Date;
}
