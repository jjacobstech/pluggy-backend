import { Injectable } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";
import bcrypt from "bcrypt";
import { RegisterUserDto } from "src/auth/dto/register-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "src/database/entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  findAll() {
    return `This action returns all users`;
  }

  async create(user: RegisterUserDto) {
    const hashedPassword: string = await bcrypt.hash(user.password, 10);
    const newUser = this.userRepository.create({
        name: user.name,
        email: user.email,
        phone_no: user.phone_no,
        password: hashedPassword,
    });
    const registeredUser = await this.userRepository.save(newUser);
    return registeredUser;
  }

  async findOne(id: string, email: string) {
    const user = await this.userRepository.findOneBy({
        id:id,
        email: email

    });

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({
        email: email,
    });

    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id,{
      ...updateUserDto
    });
    return updatedUser;
  }

  async remove(id: number) {
    const user = await this.userRepository.delete(id);

    if (!user) {
      throw new Error("User not found");
    }

    return true;
  }
}
