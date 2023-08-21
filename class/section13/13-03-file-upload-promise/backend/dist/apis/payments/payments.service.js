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
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            const payment = await queryRunner.manager.find(payment_entity_1.Payment, {
                lock: { mode: 'pessimistic_write' },
                where: { id: '0edb1d43-68d5-4225-a992-8b24b3c06972' },
            });
            console.log(payment);
            setTimeout(async () => {
                await queryRunner.commitTransaction();
            }, 5000);
            return payment;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
    }
    async create({ amount }) {
        const queryRunner = this.dataSource.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            const payment = await queryRunner.manager.find(payment_entity_1.Payment, {
                where: { id: '0edb1d43-68d5-4225-a992-8b24b3c06972' },
            });
            console.log('========== 철수가 시도 ==========');
            console.log(payment);
            console.log('==============================');
            await queryRunner.commitTransaction();
            return payment;
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
//# sourceMappingURL=payments.service.js.map