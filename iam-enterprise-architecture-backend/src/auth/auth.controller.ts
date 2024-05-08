import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { AzureADGuard } from './guards/azure-ad.guard';

@ApiTags('Auth')
@Controller('auth')
@UseGuards(AuthGuard())
export class AuthController {

    constructor() { }

    //endpoint to retrieve an access token if credentials were valid (LocalGuard does the Auth)
    @Post('login')
    @Roles('*')
    @UseGuards(LocalGuard)
    login(@Req() req: Request, @Body() authDto: AuthPayloadDto) {
        return req.user;
    }

    //endpoint to check if token is valid (JwtAuthGuard protects the endpoint)
    @Get('status')
    @Roles("customer", "admin")
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        return req.user;
    }

    @Get('validate-token')
    @ApiBearerAuth()
    @Roles("*")
    @UseGuards(AzureADGuard)
    async validateToken(@Req() req) {
        return { message: 'Token is valid' };
    }
}
