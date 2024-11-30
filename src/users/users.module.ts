import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserService } from "./user.service";
import { User } from "src/entities/user.entity";
import { UserController } from "./user.controller";


@Module({
    imports: [ TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})

export class UserModule {};