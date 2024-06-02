/// <reference types="passport" />
import { Request, Response } from 'express';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthController {
    private jwtService;
    constructor(jwtService: JwtService);
    login(req: Request, res: Response, authDto: AuthPayloadDto): Response<any, Record<string, any>>;
    logout(req: Request, res: Response): Response<any, Record<string, any>>;
    loginRefresh(req: Request): string;
    status(req: Request): Express.User;
    validateToken(req: any): Promise<string>;
}
