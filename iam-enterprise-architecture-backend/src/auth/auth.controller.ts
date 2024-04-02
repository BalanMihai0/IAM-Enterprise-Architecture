import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('Login')
    login(@Body() payload: AuthPayloadDto) {
        return this.authService.validateUser(payload);
    }
}
