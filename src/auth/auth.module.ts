import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/modules/users/users.module';
import { User } from 'src/database/entities/index.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [ UsersModule, TypeOrmModule.forFeature([User]) ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
