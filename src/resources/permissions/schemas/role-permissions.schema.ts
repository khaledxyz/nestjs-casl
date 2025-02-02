import { pgTable, integer, timestamp, primaryKey } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { roles } from 'src/resources/roles/schemas/role.schema';
import { permissions } from './permission.schema';

export const rolePermissions = pgTable('role_permissions', {
    roleId: integer('role_id').notNull().references(() => roles.id, { onDelete: 'cascade' }),
    permissionId: integer('permission_id').notNull().references(() => permissions.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
}, (table) => [
    primaryKey({ columns: [table.roleId, table.permissionId] }),
]);

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
    role: one(roles, {
        fields: [rolePermissions.roleId],
        references: [roles.id],
    }),
    permission: one(permissions, {
        fields: [rolePermissions.permissionId],
        references: [permissions.id],
    }),
}));