import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema } from 'src/database/schema';
import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from '../users/schemas/user.schema';

@Injectable()
export class UserService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase<typeof schema>) { }

    async getUserPermissions(userId: string): Promise<string[]> {
        const userPerms = await this.db
            .select({
                permissionName: schema.permissions.name,
                resource: schema.permissions.resource,
                action: schema.permissions.action,
            })
            .from(schema.users)
            .innerJoin(schema.userRoles, eq(schema.users.id, schema.userRoles.userId))
            .innerJoin(schema.roles, eq(schema.userRoles.roleId, schema.roles.id))
            .innerJoin(schema.rolePermissions, eq(schema.roles.id, schema.rolePermissions.roleId))
            .innerJoin(schema.permissions, eq(schema.rolePermissions.permissionId, schema.permissions.id))
            .where(eq(schema.users.id, userId));

        return userPerms.map(p => `${p.resource}:${p.action}`);
    }

    async assignRoleToUser(userId: string, roleId: number) {
        await this.db.insert(schema.userRoles).values({
            userId,
            roleId,
        });
    }

    async update(user: User, data: UpdateUserDto) {
        await this.db.update(schema.users).set(data).where(eq(schema.users.id, user.id));
    }
}
