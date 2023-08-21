import { PointTransaction } from './entities/pointTransaction.entity';
import { PointsTransactionsService } from './pointsTransactions.service';
import { IContext } from 'src/commons/interfaces/context';
export declare class PointsTransactionsResolver {
    private readonly pointsTransactionsService;
    constructor(pointsTransactionsService: PointsTransactionsService);
    createPointTransaction(impUid: string, amount: number, context: IContext): Promise<PointTransaction>;
}
