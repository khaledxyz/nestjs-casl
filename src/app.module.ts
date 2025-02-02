import { Module, UnauthorizedException } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './resources/users/users.module';
import { RolesModule } from './resources/roles/roles.module';
import { PermissionsModule } from './resources/permissions/permissions.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './resources/user/user.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { UserService } from './resources/user/user.service';
import { AbilityFactory } from './casl/ability.factory';
import { CaslModule } from './casl/casl.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    JwtModule.register({
      global: true,
      secret: 'xx',
      signOptions: { expiresIn: '1h' },
    }),
    UsersModule,
    RolesModule,
    PermissionsModule,
    AuthModule,
    UserModule,
    CaslModule,
  ],
  controllers: [],
  providers: [
    AbilityFactory,
    UserService,
    JwtAuthGuard,
    {
      provide: APP_FILTER,
      useClass: UnauthorizedException,
    },
  ]
})
export class AppModule { }
