import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema } from 'src/database/schema';
import { LoginDto } from './dtos/login.dto';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,

        private readonly jwt: JwtService,
    ) { }

    async login(data: LoginDto) {
        const { email, password } = data;

        const [user] = await this.db
            .select()
            .from(schema.users)
            .where(eq(schema.users.email, email))
            .limit(1);

        if (!user) throw new UnauthorizedException('users/wrong-email-or-password');

        const isPasswordValid = await compare(password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('users/wrong-email-or-password');

        const token = await this.jwt.signAsync({ id: user.id, email: user.email });

        return { ...user, token };
    }
}
