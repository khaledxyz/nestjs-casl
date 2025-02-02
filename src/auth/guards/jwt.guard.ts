import { Injectable, ExecutionContext, UnauthorizedException, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DATABASE_CONNECTION } from 'src/database/database-connection';
import { schema } from 'src/database/schema';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
    constructor(
        @Inject(DATABASE_CONNECTION) private readonly db: NodePgDatabase<typeof schema>,
        private readonly jwtService: JwtService
    ) { super(); }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];

        if (!token) throw new UnauthorizedException('No token provided');

        try {
            const decoded = this.jwtService.verify(token);
            const [user] = await this.db
                .select()
                .from(schema.users)
                .where(eq(schema.users.id, decoded.id))
                .limit(1);

            if (!user) throw new UnauthorizedException('User not found');

            request.user = user;
            return true;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }
}