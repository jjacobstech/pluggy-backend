import { User } from "./user.entity";
export declare class Session {
    id: number;
    token: string;
    expires_at: Date;
    ip_address: string;
    user_agent: string;
    user_id: number;
    user: User;
    created_at: Date;
    updated_at: Date;
}
