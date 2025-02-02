import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dtos/create-role.dto';
import { AssignPermissionToRoleDto } from './dtos/assign-permission-to-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly service: RolesService) { }

  @Post()
  async create(@Body() body: CreateRoleDto) {
    return await this.service.create(body);
  }

  @Patch('/:id/permissions')
  async assignPermissionToRole(@Param('id') roleId: number, @Body() body: AssignPermissionToRoleDto) {
    return await this.service.assignPermissionToRole(roleId, body);
  }
}
