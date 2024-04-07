import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/user';

@Module({
  imports: [AuthModule, UsersModule, TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'studmysql01.fhict.local',
    port: 3306,
    username: 'dbi500552',
    password: 'l6kz*#w7D$Q0',
    database: 'dbi500552',
    entities: [User],
    synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
