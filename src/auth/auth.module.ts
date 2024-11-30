import { Module } from "@nestjs/common";
import { UserModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [UserModule,
        JwtModule.register({
            global: true,
            secret: "Hello World!"
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})

export class AuthModule { };