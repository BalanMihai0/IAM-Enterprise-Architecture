import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './roles/roles.decorator';

@Controller('auth')
export class AuthController {

    constructor() { }

    //endpoint to retrieve an access token if credentials were valid (LocalGuard does the Auth)
    @Post('login')
    @Roles('*')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user;
    }

    //endpoint to check if token is valid (JwtAuthGuard protects the endpoint)
    @Get('status')
    @Roles("customer", "admin")
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user;
    }

}
