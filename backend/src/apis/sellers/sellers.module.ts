import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { SellerResolvers } from './sellers.resolver';
import { SellerServices } from './sellers.service';

@Module({
  imports: [
    // typeorm 모듈은 엔티티를 전달한다. 없으면 데이터베이스와 연동이 안됨
    TypeOrmModule.forFeature([
      Seller, //
    ]),
  ],
  providers: [
    SellerResolvers, //
    SellerServices,
  ],
})
export class SellerModule {}
