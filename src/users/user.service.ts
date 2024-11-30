import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/dtos/userInform.dto";
import { User } from "src/entities/user.entity";
import { Repository } from "typeorm";



@Injectable()
export class UserService {
    constructor ( @InjectRepository(User) private userRepository: Repository<User> ) {};

    addUser ( userInform: UserDto): Promise<User> {
        const newUser = this.userRepository.create(userInform);
        return this.userRepository.save(newUser);
    }

    findUser ( email: string ): Promise<User> {
        return this.userRepository.findOne({ where: { email: email }})
    }

    async findCurrentUser ( email: string ): Promise<User> {
        const user = await this.findUser(email);
        return user;
    }

}