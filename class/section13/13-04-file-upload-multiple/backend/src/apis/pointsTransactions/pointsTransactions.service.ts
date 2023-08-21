import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import {
  POINT_TRANSACTION_STATUS_ENUM,
  PointTransaction,
} from './entities/pointTransaction.entity';
import { IPointsTransactionsServiceCreate } from './interfaces/points-transactions-service.interface';
import { User } from '../users/entities/use.entity';

@Injectable()
export class PointsTransactionsService {
  constructor(
    @InjectRepository(PointTransaction)
    private readonly pointsTransactionsRepository: Repository<PointTransaction>,

    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    // 트랜젝션
    private readonly dataSource: DataSource,
  ) {}

  // // 등록을 위한 빈 객체 만들기
  // this.pointsTransactionsRepository.create()

  // // 등록만 하고 결과 반환 X(save는 결과 반환 o)
  // this.pointsTransactionsRepository.insert()

  // // db업데이트
  // this.pointsTransactionsRepository.update()

  async create({
    impUid,
    amount,
    user: _user,
  }: IPointsTransactionsServiceCreate): Promise<PointTransaction> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      // 1. pointTransaction 테이블에 거래기록 1줄 생성
      const pointTransaction = await this.pointsTransactionsRepository.create({
        impUid,
        amount,
        user: _user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });

      // await this.pointsTransactionsRepository.save(pointTransaction);
      await queryRunner.manager.save(pointTransaction); // 짭 세이브(임시저장), 디폴트로 pointsTransactionsRepository

      // 2. 유저 돈 찾아오기
      // const user = await this.usersRepository.findOne({
      //   where: { id: _user.id },
      // });
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
      }); // 짭 세이브(임시저장)

      // 3. 유저 돈 업데이트(update와 save는 비슷)
      // await this.usersRepository.update(
      //   { id: _user.id },
      //   { point: user.point + amount },
      // );
      const updatedUser = await this.usersRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(updatedUser);
      await queryRunner.commitTransaction();

      // 4. 최종결과 브라우저에 돌려주기
      return pointTransaction;
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
