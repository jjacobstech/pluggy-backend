import { UpdateUserDto } from "./dto/update-user.dto";
import { RegisterUserDto } from "src/auth/dto/register-user.dto";
import { Repository } from "typeorm";
import { User } from "src/database/entities/user.entity";
export declare class UsersService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    findAll(): string;
    create(user: RegisterUserDto): Promise<User>;
    findOne(id: string, email: string): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    remove(id: number): Promise<boolean>;
}
