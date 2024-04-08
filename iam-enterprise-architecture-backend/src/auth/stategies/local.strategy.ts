import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from 'passport-local'
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            //By default AuthGuard looks for 'username', otherwise it gives 401. So we need to set usernameField to be 'email' manually
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<string> {
        const token = await this.authService.validateUser({ email, password });
        
        if (!token) {
            throw new UnauthorizedException("Invalid credentials!");
        }
        return token;
    }
}