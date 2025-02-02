import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user-dto';
import { schema } from 'src/database/schema';
import { eq } from 'drizzle-orm';
import { hashPassword } from 'src/shared/utils';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

@Injectable()
export class UsersService {
    constructor(@Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase<typeof schema>) { }

    async get() {
        return await this.db.select().from(schema.users);
    }

    async create(data: CreateUserDto) {
        const { email, password } = data

        const [userExist] = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, email))
            .limit(1);

        if (userExist) throw new ConflictException('users/email-already-exists');
        const hashedPassword = await hashPassword(password);

        data.password = hashedPassword;

        const [user] = await this.db.insert(schema.users).values(data).returning();

        return user;
    }
}
