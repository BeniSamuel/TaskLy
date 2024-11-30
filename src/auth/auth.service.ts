import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { STATUS_CODES } from 'http';
import { UserDto } from 'src/dtos/userInform.dto';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signupUser(userInform: UserDto) {
    // Check if the user doesn't exist
    const user = await this.userService.findUser(userInform.email);
    if (user) {
      throw new UnauthorizedException('User Already Exist!!');
    }

    // User the user is new add him in the system
    const newUser = await this.userService.addUser(userInform);

    // Generating the token
    const payload = { id: newUser.id, email: newUser.email };
    return {
      status: 'Good',
      STATUS_CODES: 201,
      access_token: await this.jwtService.signAsync(payload),
      message: "User Created"
    };
  }

  async loginUser ( loginInform: { email: string, password: string }) {

    // Check if the user doesn't exist
    const user = await this.userService.findUser(loginInform.email);
    if (!user) {
      throw new UnauthorizedException("User doesn't exist!!");
    }

    // Verify user password
    if ( user.password !== loginInform.password ) {
      throw new UnauthorizedException("Incorrect Password!!");
    }

    // Generating the token
    const payload = { id: user.id, email: user.email };
    return {
      status: 'Good',
      STATUS_CODES: 201,
      access_token: await this.jwtService.signAsync(payload),
      message: "User Created"
    };
  }
}
