import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user-dto';
import { PermissionsGuard } from 'src/casl/permissions.guard';
import { CheckPolicies } from 'src/casl/policies.decorator';
import { PolicyHandlerCallback } from 'src/casl/policy-handler.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  @Get()
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @CheckPolicies(new PolicyHandlerCallback((ability) => ability.can('read', 'users')))
  async get() {
    return await this.service.get();
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return await this.service.create(data);
  }
}
