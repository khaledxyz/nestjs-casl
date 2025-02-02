import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema } from 'src/database/schema';
import { CreateRoleDto } from './dtos/create-role.dto';
import { AssignPermissionToRoleDto } from './dtos/assign-permission-to-role.dto';

@Injectable()
export class RolesService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase<typeof schema>) { }

    async create(body: CreateRoleDto) {
        return await this.db.insert(schema.roles).values(body).returning()
    }

    async assignPermissionToRole(roleId: number, body: AssignPermissionToRoleDto) {
        const { permissionIds } = body;

        const values = permissionIds.map(permissionId => ({ roleId, permissionId }));
        await this.db.insert(schema.rolePermissions).values(values);
    }
}
