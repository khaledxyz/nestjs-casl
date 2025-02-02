import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from 'src/auth/decorators/user.decorator';
import { User as UserType } from '../users/schemas/user.schema';

@Controller('user')
@UseGuards(JwtAuthGuard)
export class UserController {
  constructor(private readonly service: UserService) { }

  @Patch()
  async update(@User() user: UserType, @Body() data: UpdateUserDto) {
    return await this.service.update(user, data);
  }
}
