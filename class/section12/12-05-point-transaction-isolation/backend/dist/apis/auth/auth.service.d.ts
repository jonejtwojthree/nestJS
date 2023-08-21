import { UsersService } from '../users/users.service';
import { IAuthServiceGetAccessToken, IAuthServiceLogin, IAuthServiceRestoreAccessToken, IAuthServiceSetRefreshToken } from './interfaces/auth-service.interface';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersService;
    private jwtService;
    constructor(usersService: UsersService, jwtService: JwtService);
    login({ email, password, context, }: IAuthServiceLogin): Promise<string>;
    restoreAccessToken({ user }: IAuthServiceRestoreAccessToken): string;
    setRefreshToken({ user, context }: IAuthServiceSetRefreshToken): void;
    getAccessToken({ user }: IAuthServiceGetAccessToken): string;
}
