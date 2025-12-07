import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
  ) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, isAdmin: user.is_admin };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
