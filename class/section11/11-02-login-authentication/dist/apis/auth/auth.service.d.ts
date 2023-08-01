import { UsersService } from '../users/users.service';
import { IAuthServiceGetAccessToken, IAuthServiceLogin } from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login({ email, password }: IAuthServiceLogin): Promise<string>;
    getAccessToken({ user }: IAuthServiceGetAccessToken): string;
}
