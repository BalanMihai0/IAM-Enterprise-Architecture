import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as jwksRsa from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AzureADStrategy extends PassportStrategy(Strategy, 'azure-ad') {
  constructor(protected readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      aud: configService.get('MSAL_API_CLIENT_ID'),
      iss: `https://sts.windows.net/${configService.get('MSAL_WEB_TENANT_ID')}/`,
      algorithms: ['RS256'],
      ignoreExpiration: false,
      secretOrKeyProvider: jwksRsa.passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `https://login.microsoftonline.com/${configService.get('MSAL_WEB_TENANT_ID')}/discovery/v2.0/keys`,
      }),
    });
  }

  validate(payload: any) {
    return payload;
  }
}