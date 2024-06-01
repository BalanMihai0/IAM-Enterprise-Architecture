import { ExecutionContext } from '@nestjs/common';
declare const AzureADGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class AzureADGuard extends AzureADGuard_base {
    getRequest(context: ExecutionContext): any;
}
export {};
