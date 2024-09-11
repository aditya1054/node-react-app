import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from './user.model';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService) { }

  async signIn(username: string, pass: string): Promise<any> {
    const user: UserModel = await this.usersService.findUser(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    
    const payload = { id: user.id, username: user.username };

    return {
      username: username,
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}