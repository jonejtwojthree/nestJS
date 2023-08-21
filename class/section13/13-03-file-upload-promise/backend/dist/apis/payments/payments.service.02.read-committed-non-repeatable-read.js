"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const payment_entity_1 = require("./entities/payment.entity");
let PaymentsService = exports.PaymentsService = class PaymentsService {
    constructor(paymentsRepository, dataSource) {
        this.paymentsRepository = paymentsRepository;
        this.dataSource = dataSource;
    }
    async findAll() {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('READ COMMITTED');
        try {
            const payment = await queryRunner.manager.findOne(payment_entity_1.Payment, {
                where: { id: 'd2ee2dea-816e-4aa0-9f19-e10b94ffe464' },
                select: { amount: true },
            });
            console.log(`당신이 가진 돈은 ${payment.amount}원 입니다.`);
            const paymentTax = await queryRunner.manager.findOne(payment_entity_1.Payment, {
                where: { id: 'd2ee2dea-816e-4aa0-9f19-e10b94ffe464' },
                select: { amount: true, tax: true },
            });
            const result = paymentTax.amount - paymentTax.tax;
            console.log(`당신이 가진 돈에서 세금을 제외하면 ${result}원 입니다.`);
            setTimeout(async () => {
                const paymentCommission = await queryRunner.manager.findOne(payment_entity_1.Payment, {
                    where: { id: 'd2ee2dea-816e-4aa0-9f19-e10b94ffe464' },
                    select: { amount: true, commission: true },
                });
                const result = paymentCommission.amount - paymentCommission.commission;
                console.log(`당신이 가진 돈에서 수수료를 빼면 ${result}원 입니다.`);
            }, 5000);
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
    }
    async create({ amount }) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('READ COMMITTED');
        try {
            const payment = await queryRunner.manager.findOne(payment_entity_1.Payment, {
                where: { id: 'd2ee2dea-816e-4aa0-9f19-e10b94ffe464' },
            });
            payment.amount = 1;
            await queryRunner.manager.save(payment);
            await queryRunner.commitTransaction();
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
    }
};
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(payment_entity_1.Payment)),
    __metadata("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.DataSource !== "undefined" && typeorm_2.DataSource) === "function" ? _b : Object])
], PaymentsService);
//# sourceMappingURL=payments.service.02.read-committed-non-repeatable-read.js.map