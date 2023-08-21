import { DataSource, Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
export declare class PaymentsService {
    private readonly paymentsRepository;
    private readonly dataSource;
    constructor(paymentsRepository: Repository<Payment>, dataSource: DataSource);
    findAll(): any;
    create({ amount }: {
        amount: any;
    }): any;
}
