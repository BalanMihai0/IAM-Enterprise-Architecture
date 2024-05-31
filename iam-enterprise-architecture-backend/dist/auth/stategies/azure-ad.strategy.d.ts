import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
declare const AzureADStrategy_base: new (...args: any[]) => Strategy;
export declare class AzureADStrategy extends AzureADStrategy_base {
    protected readonly configService: ConfigService;
    constructor(configService: ConfigService);
    validate(payload: any): any;
}
export {};
