import { Module, Global } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from './database-connection';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';
import * as schema from './schema';

@Global()
@Module({
    providers: [
        {
            provide: DATABASE_CONNECTION,
            useFactory: (configService: ConfigService) => {
                const pool = new Pool({ connectionString: configService.getOrThrow('DATABASE_URL') });
                return drizzle(pool, { schema });
            },
            inject: [ConfigService],
        },
    ],
    exports: [DATABASE_CONNECTION],
})
export class DatabaseModule { }