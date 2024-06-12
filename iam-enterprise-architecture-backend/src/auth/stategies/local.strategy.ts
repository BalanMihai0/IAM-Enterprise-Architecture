import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from 'passport-local'
import { AuthService } from "../auth.service";
import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            //By default AuthGuard looks for 'username', otherwise it gives 401. So we need to set usernameField to be 'email' manually
            usernameField: 'email',
        });
    }

    async validate(email: string, password: string): Promise<string> {
        try {
            const token = await this.authService.validateUser({ email, password });
            if (!token) {
                throw new UnauthorizedException("Login was not successful! Please check credentials and try again...");
            }
            return token;
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException("Login was not successful! Please check credentials and try again...");
        }
    }
}