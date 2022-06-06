import { Injectable } from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) { }

    async validateUser(username: string, password: string): Promise<User> {
        const user = await this.usersService.findWithUsername(username);
        if (user && user.password === password) {
            const { password, ...result } = user;
            return result as User;
        }
        return null;
    }
}
