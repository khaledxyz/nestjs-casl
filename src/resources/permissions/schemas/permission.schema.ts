import { pgTable, serial, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { rolePermissions } from './role-permissions.schema';

export const permissions = pgTable('permissions', {
    id: serial('id').primaryKey(),

    name: varchar('name', { length: 255 }).notNull().unique(),
    description: text('description'),
    resource: varchar('resource', { length: 255 }).notNull(),
    action: varchar('action', { length: 50 }).notNull(), // e.g., 'create', 'read', 'update', 'delete'

    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const permissionsRelations = relations(permissions, ({ many }) => ({
    rolePermissions: many(rolePermissions),
}));

export type Permission = typeof permissions.$inferSelect;
