import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModules } from './apis/products/products.module';
import { ConfigModule } from '@nestjs/config';
import { SellerModule } from './apis/sellers/sellers.module';
import { UsersModule } from './apis/users/users.module';
import { AuthsModule } from './apis/auths/auths.module';
import { PointChargeModule } from './apis/pointCharge/pointCharge.module';
import { FilesModule } from './apis/files/files.module';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { ProductReviewsModule } from './apis/productsReview/productReviews.module';
import { ProductInquiriesModule } from './apis/productsInquiry/productInquiries.module';
import { ProductInquiryAnswersModule } from './apis/productsInquiryAnswers/productInquiryAnswers.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    AuthsModule,
    ProductModules,
    PointChargeModule,
    SellerModule,
    UsersModule,
    FilesModule,
    ProductReviewsModule,
    ProductInquiriesModule,
    ProductInquiryAnswersModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: process.env.REDIS_URL,
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
