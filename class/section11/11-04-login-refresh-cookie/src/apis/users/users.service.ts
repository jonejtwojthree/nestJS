import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/use.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IUsersServiceCreate,
  IUsersServiceFindOneByEmail,
} from './interfaces/users-service.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOneByEmail({ email }: IUsersServiceFindOneByEmail): Promise<User> {
    return this.userRepository.findOne({ where: { email } });
  }

  async create({
    email,
    password,
    name,
    age,
  }: IUsersServiceCreate): Promise<User> {
    const user = this.findOneByEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다');
    //throw new HttpException('이미 등록된 이메일 입니다', HttpStatus.CONFLICT);

    // const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword = password;
    return this.userRepository.save({
      email,
      password: hashedPassword,
      name,
      age,
    });
  }
}
