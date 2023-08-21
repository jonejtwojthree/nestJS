import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { BoardsModule } from './apis/boards/boards.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './apis/products/products.module';
import { ProductsCategoriesModule } from './apis/productsCategories/productsCategories.module';
import { UsersModule } from './apis/users/users.module';
import { AuthModule } from './apis/auth/auth.module';
import { PointsTransactionsModule } from './apis/pointsTransactions/pointsTransactions.module';
import { PaymentsMoudle } from './apis/payments/payments.module';
import { FilesModule } from './apis/files/files.module';

import type { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    BoardsModule,
    FilesModule,
    PaymentsMoudle,
    PointsTransactionsModule,
    ProductsModule,
    ProductsCategoriesModule,
    UsersModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => {
        return { req, res };
      },
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql', // postgress mysql ...
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

      // docker:
      //host: 'redis://my-redis:6379',
      //port: 6379,
      isGlobal: true,
    }),
  ],
})
export class AppModule {}
