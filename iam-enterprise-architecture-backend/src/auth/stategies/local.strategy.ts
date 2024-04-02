import { PassportStrategy } from "@nestjs/passport"
import { Strategy } from 'passport-local'
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            //By default AuthGuard looks for 'username', otherwise it gives 401. So we need to set usernameField to be 'email' manually
            usernameField: 'email',
        });
    }

    validate(email: string, password: string) {
        const user = this.authService.validateUser({email, password});
        
        if (!user) throw new UnauthorizedException();
        return user;
    }
}