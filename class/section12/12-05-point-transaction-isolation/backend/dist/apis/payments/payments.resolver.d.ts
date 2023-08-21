import { PaymentsService } from './payments.service';
export declare class PaymentsResolver {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    createPayment(amount: number): Promise<void>;
    fetchPayments(): Promise<void>;
}
