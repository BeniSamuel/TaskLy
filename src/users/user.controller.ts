import { Controller, Get, Req, UseGuards, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('/me')
export class UserController {
    constructor(private userService: UserService) {}

    @UseGuards(AuthGuard)
    @Get()
    async getCurrentUser(@Req() req) {
        if (!req.user) {
            throw new UnauthorizedException('No user found');
        }
        return await this.userService.findCurrentUser(req.user.email);
    }
}
