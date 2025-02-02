import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) { }

  @Post()
  async login(@Body() data: LoginDto) {
    return await this.service.login(data);
  }
}
