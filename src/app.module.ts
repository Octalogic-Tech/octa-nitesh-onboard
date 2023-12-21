import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import {dataSourceOptions} from 'db/data-source';
import { ConfigModule } from '@nestjs/config';
import configuration from 'db/configuration';


@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration], 
    }),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
