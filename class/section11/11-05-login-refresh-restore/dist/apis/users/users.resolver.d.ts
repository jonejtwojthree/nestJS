import { UsersService } from './users.service';
import { User } from './entities/use.entity';
import { IContext } from 'src/commons/interfaces/context';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    fetchUser(context: IContext): string;
    createUser(email: string, password: string, name: string, age: number): Promise<User>;
}
