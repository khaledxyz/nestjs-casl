import { AppAbility } from './ability.factory';

export interface PolicyHandler {
    handle(ability: AppAbility): boolean;
}

type PolicyHandlerCallbackFunction = (ability: AppAbility) => boolean;

export class PolicyHandlerCallback implements PolicyHandler {
    constructor(private handler: PolicyHandlerCallbackFunction) { }

    handle(ability: AppAbility): boolean {
        return this.handler(ability);
    }
}