import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { userRoles } from 'src/resources/users/schemas/user-roles.schema';
import { rolePermissions } from 'src/resources/permissions/schemas/role-permissions.schema';

export const roles = pgTable('roles', {
    id: serial('id').primaryKey(),
    name: varchar('name', { length: 255 }).notNull().unique(),
    description: text('description'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
    userRoles: many(userRoles),
    rolePermissions: many(rolePermissions),
}));

export type Role = typeof roles.$inferSelect;
