import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import {
  PointCharge,
  POINT_TRANSACTION_STATUS_ENUM,
} from './entities/pointCharge.entity';

@Injectable()
export class PointChargeService {
  constructor(
    @InjectRepository(PointCharge)
    private readonly pointsChargeRepository: Repository<PointCharge>, //

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly connection: Connection,
  ) {}

  async create({ impUid, amount, user: _user }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const user = await queryRunner.manager.findOne(User, {
        where: { id: _user.id },
        lock: { mode: 'pessimistic_write' },
      });

      const pointTransaction = this.pointsChargeRepository.create({
        impUid,
        price: amount,
        user: user,
        status: POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
      });
      await queryRunner.manager.save(pointTransaction);

      const upatedUser = this.userRepository.create({
        ...user,
        point: user.point + amount,
      });
      await queryRunner.manager.save(upatedUser);

      await queryRunner.commitTransaction();

      return pointTransaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async createCancle({ impUid, user, amount }) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.startTransaction('SERIALIZABLE');

    try {
      const findUser = await queryRunner.manager.findOne(User, {
        where: { id: user.id },
        lock: { mode: 'pessimistic_write' },
      });

      const upatedUser = this.userRepository.create({
        ...findUser,
        point: Number(findUser.point) - Number(amount),
      });
      await queryRunner.manager.save(upatedUser);

      const cancledPoint = this.pointsChargeRepository.create({
        price: -Number(amount),
        impUid: impUid,
        user: findUser,
        status: POINT_TRANSACTION_STATUS_ENUM.CANCEL,
      });

      await queryRunner.manager.save(cancledPoint);

      await queryRunner.commitTransaction();

      return cancledPoint;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async findPayment({ impUid }) {
    try {
      const result = await this.pointsChargeRepository.findOne({
        where: { impUid: impUid },
        order: { id: 'DESC' },
        relations: ['user'],
      });

      return result;
    } catch (error) {
      throw Error(error);
    }
  }
}
