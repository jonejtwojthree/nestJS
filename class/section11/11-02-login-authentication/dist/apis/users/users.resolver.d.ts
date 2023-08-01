import { UsersService } from './users.service';
import { User } from './entities/use.entity';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(email: string, password: string, name: string, age: number): Promise<User>;
}
