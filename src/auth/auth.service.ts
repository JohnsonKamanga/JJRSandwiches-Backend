import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtservice: JwtService,
    private configService: ConfigService
  ) {}

  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (!user) {
      throw new TypeError('user not found');
    }
    //compared stored hash to entered password
    const res = await bcrypt.compare(pass, user?.password);
    if (!res) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtservice.signAsync(payload),
    };
  }

  async verify(access_token: string): Promise<any> {
    try {
      await this.jwtservice.verifyAsync(access_token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      });
    } catch (error) {
      console.error(error);
      return {isvalid: false};
    }

    return {isValid: true};
  }

  async decode(access_token: string): Promise<any>{
    let data = '';
      try{
          data = await this.jwtservice.decode(access_token);
      }catch(error){
        console.error(error);
        data = null;
      }

      return data ;
  }
}
