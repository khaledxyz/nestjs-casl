import { Injectable } from "@nestjs/common";
import { createMongoAbility, AbilityBuilder, ExtractSubjectType, InferSubjects, MongoAbility } from "@casl/ability";
import { UserService } from '../resources/user/user.service';
import { User } from "src/resources/users/schemas/user.schema";

export type AppAbility = MongoAbility<[string, string]>;

@Injectable()
export class AbilityFactory {
    constructor(private readonly userService: UserService) { }

    async defineAbility(user: User) {
        const { can, cannot, build } = new AbilityBuilder<MongoAbility<[string, string]>>(createMongoAbility);

        const permissions = await this.userService.getUserPermissions(user.id);

        permissions.forEach((permission: string) => {
            const [resource, action] = permission.split(':');
            can(action, resource);
        });

        return build({
            detectSubjectType: (item: any) => item.constructor as ExtractSubjectType<string>
        });
    }
}