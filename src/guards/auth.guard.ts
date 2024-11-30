import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = this.extractTokenFromHeaders(request);

            if (!token) {
                throw new UnauthorizedException('Token is missing');
            }

            const payload = await this.jwtService.verifyAsync(token, {
                secret: 'Hello World!', // Ensure this secret matches the one used during token creation
            });

            request['user'] = payload;
        } catch (error) {
            console.error('Authorization Error:', error); // Log the error for debugging
            throw new UnauthorizedException({
                message: 'You are not authorized to perform this kind of action.',
            });
        }
        return true;
    }

    private extractTokenFromHeaders(request: Request): string {
        const authHeader = request.headers.authorization;
        if (!authHeader) return undefined;

        const [type, token] = authHeader.split(' ');
        return type === 'Bearer' ? token : undefined;
    }
}
