import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

const tempUsers = [
    {
        id: 1,
        email: "johndoe@gmail.com",
        password: "abc123",
        role: 'customer'
    },
    {
        id: 2,
        email: "leoking@gmail.com",
        password: "123psw",
        role: 'customer'
    },
    {
        id: 3,
        email: "hawkerbob@gmail.com",
        password: "123321",
        role: 'sales'
    }
]

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) { }

    //method to check if user exists and if entered password is correct
    //for now does not include hash comparison (since passwords are not hashed of demo users)
    validateUser(payload: AuthPayloadDto): string | null {
        const { email, password } = payload; 
        const foundUser = tempUsers.find((user) => user.email === email);
        
        if (!foundUser || password !== foundUser.password) {
            return null;
        }
        return this.login(foundUser);
    }

    //method to generate a jwt token
    private login(user: any) {
        const tokenPayload = {
            id: user.id.toString(),
            role: user.role
        };
        return this.jwtService.sign(tokenPayload);
    }
    
}
