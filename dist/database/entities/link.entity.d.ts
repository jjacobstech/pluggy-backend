import { User } from "./user.entity";
export declare class Link {
    id: string;
    url: string;
    shortUrl: string;
    user_id?: string;
    user: User;
    created_at: Date;
    updatedAt: Date;
}
