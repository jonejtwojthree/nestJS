import { Repository } from 'typeorm';
import { PointTransaction } from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/use.entity';
export declare class PointsTransactionsService {
    private readonly pointsTransactionsRepository;
    private readonly usersRepository;
    constructor(pointsTransactionsRepository: Repository<PointTransaction>, usersRepository: Repository<User>);
    create({ impUid, amount, user: _user, }: IPointsTransactionsServiceCreate): Promise<PointTransaction>;
}
