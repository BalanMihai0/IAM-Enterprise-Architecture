import { Request } from 'express';
import { ExtractJwt } from 'passport-jwt';

const customExtractor = (req: Request) => {
 // Try to extract token from Authorization header
 const tokenFromHeader = ExtractJwt.fromAuthHeaderAsBearerToken()(req);
 if (tokenFromHeader) {
    return tokenFromHeader;
 }

 // Fallback to extracting token from 'refreshToken' cookie
 return req.cookies['refreshToken'];
};
