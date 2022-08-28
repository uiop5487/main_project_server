import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { User } from '../users/entities/user.entity';
import { UsersServices } from '../users/users.service';

import { PointCharge } from './entities/pointCharge.entity';
import { PointChargeResolver } from './pointCharge.resolver';
import { PointChargeService } from './pointCharge.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User, //
      PointCharge,
    ]),
  ],
  providers: [
    PointChargeResolver, //
    PointChargeService, //
    IamportService, //
    UsersServices,
  ],
})
export class PointChargeModule {}
