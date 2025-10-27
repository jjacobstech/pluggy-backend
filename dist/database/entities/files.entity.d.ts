import { User } from "./user.entity";
export declare class File {
    id: string;
    file_name: string;
    file_path: string;
    file_format: string;
    file_type: string;
    file_size: number;
    user: User;
    created_at: Date;
    updatedAt: Date;
}
