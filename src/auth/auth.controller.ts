import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { UserDto } from "src/dtos/userInform.dto";


@Controller("auth")
export class AuthController {
    constructor( private authService: AuthService ) {};

    @Post("login")
    async loginHandler ( @Body() loginInform: { email: string, password: string }) {
        return this.authService.loginUser(loginInform);
    }

    @Post("signup")
    async signupHandler ( @Body() userInform: UserDto ) {
        return this.authService.signupUser(userInform);
    }
}
