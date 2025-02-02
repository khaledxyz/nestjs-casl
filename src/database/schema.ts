import { users } from "src/resources/users/schemas/user.schema";
import { userRoles } from "src/resources/users/schemas/user-roles.schema";
import { roles } from "src/resources/roles/schemas/role.schema";
import { rolePermissions } from "src/resources/permissions/schemas/role-permissions.schema";
import { permissions } from "src/resources/permissions/schemas/permission.schema";

export const schema = {
    users,
    userRoles,
    roles,
    rolePermissions,
    permissions,
}