import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AzureADGuard extends AuthGuard('azure-ad') {
 getRequest(context: ExecutionContext) {
    return context.switchToHttp().getRequest();
 }
}
