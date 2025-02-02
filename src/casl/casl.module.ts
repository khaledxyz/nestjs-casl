import { Global, Module } from '@nestjs/common';
import { AbilityFactory } from './ability.factory';
import { PermissionsGuard } from './permissions.guard';
import { UserModule } from 'src/resources/user/user.module';

@Global()
@Module({
    imports: [UserModule],
    providers: [AbilityFactory, PermissionsGuard],
    exports: [AbilityFactory, PermissionsGuard],
})
export class CaslModule { }