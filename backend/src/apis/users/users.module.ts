import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/commons/auth/jwt-access.strategy';
import { User } from './entities/user.entity';
import { UsersResolvers } from './users.resolver';
import { UsersServices } from './users.service';

@Module({
  imports: [
    // typeorm 모듈은 엔티티를 전달한다. 없으면 데이터베이스와 연동이 안됨
    TypeOrmModule.forFeature([
      User, //
    ]),
  ],
  providers: [
    UsersResolvers, //
    UsersServices,
  ],
})
export class UsersModule {}
