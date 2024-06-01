/// <reference types="passport" />
import { Request } from 'express';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private jwtService;
    constructor(jwtService: JwtService);
    login(req: Request, authDto: AuthPayloadDto): Express.User;
    loginRefresh(req: Request): string;
    status(req: Request): Express.User;
    validateToken(req: any): Promise<string>;
}
