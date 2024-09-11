import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import {UserService} from './user.service';
import {UserController} from './user.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: "privateKey",
      global: true,
      signOptions: {
        expiresIn: "5h"
      }
    })
  ],
  controllers: [UserController],
  providers: [UserService, AuthService]
})
export class UserModule {}
