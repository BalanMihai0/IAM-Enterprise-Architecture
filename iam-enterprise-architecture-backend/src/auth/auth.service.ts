import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const tempUsers = [
    {
        id: 1,
        email: "johndoe@gmail.com",
        password: "abc123",
        role: 'customer'
    }
]


@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {

    }

    validateUser(payload: AuthPayloadDto): string | null {
        const { email, password } = payload; 
        const foundUser = tempUsers.find((user) => user.email === email);
        
        if (!foundUser || password !== foundUser.password) {
            return null;
        }
        return this.login(foundUser);
    }

    login(user: any) {
        const tokenPayload = {
            id: user.id.toString(),
            role: user.role
        };
        return this.jwtService.sign(tokenPayload);
    }
    
}
