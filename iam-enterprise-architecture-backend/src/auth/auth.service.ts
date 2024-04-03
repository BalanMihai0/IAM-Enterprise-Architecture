import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    //method to check if user exists and if entered password is correct + hash comparison
    async validateUser(payload: AuthPayloadDto): Promise<string | null> {
        const { email, password } = payload;
        const user = await this.usersService.findByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return null;
        }
        return this.login(user);
    }

    //method used to generate a jwt
    private login(loginPayload: any): string {
        const tokenPayload = {
            id: loginPayload.id.toString(),
            role: loginPayload.role,
        };
        return this.jwtService.sign(tokenPayload);
    }

}
