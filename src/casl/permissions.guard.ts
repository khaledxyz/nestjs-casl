import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AbilityFactory } from './ability.factory';
import { CHECK_POLICIES_KEY } from './policies.decorator';
import { PolicyHandler } from './policy-handler.interface';

@Injectable()
export class PermissionsGuard implements CanActivate {
    constructor(private reflector: Reflector, private abilityFactory: AbilityFactory) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const handlers = this.reflector.get<PolicyHandler[]>(CHECK_POLICIES_KEY, context.getHandler()) || [];
        const { user } = context.switchToHttp().getRequest();

        const ability = await this.abilityFactory.defineAbility(user);

        return handlers.every(handler => handler.handle(ability));
    }
}