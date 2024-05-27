import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalGuard } from './guards/local.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { Roles } from './roles/roles.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthPayloadDto } from './dto/auth.dto';
import { AzureADGuard } from './guards/azure-ad.guard';
import { JwtService } from '@nestjs/jwt';
import { jwtDecode } from 'jwt-decode';
import * as jwt from 'jsonwebtoken';
import { strict } from 'assert';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  //endpoint to retrieve a refresh token if credentials were valid (LocalGuard does the Auth)
  @Post('login')
  @Roles('*')
  @UseGuards(LocalGuard)
  login(@Req() req: Request, @Res() res: Response, @Body() authDto: AuthPayloadDto) {
    const refreshToken = req.user;

    res.cookie('refreshToken', refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).send({message: 'Login successful'});
  }

  @Get('logout')
  @Roles("*")
  logout(@Req() req: Request, @Res() res: Response) {
    res.cookie('refreshToken', '', {
      sameSite: 'strict',
      httpOnly: true,
      maxAge: 0,
    });

    return res.status(200).send({ message: 'Logout successful' });
  }

  //endpoint to retrieve an actual access token if refresh token was valid
  @Get('refresh')
  @Roles('*')
  loginRefresh(@Req() req: Request) {
    const refreshToken = req.cookies.refreshToken;

    try {
      jwt.verify(refreshToken, process.env.JWT_SECRET_KEY);
    } catch (error) {
      throw new UnauthorizedException();
    }

    const decodedToken = jwtDecode(refreshToken);

    const uniqueName = (decodedToken as any).unique_name;

    let role = 'customer';
    if (
      decodedToken.iss ===
      'https://sts.windows.net/00968c3f-7e86-471d-b6e2-5811aaae8d59/'
    ) {
      role = 'admin';
    }

    const newToken = this.jwtService.sign(
      {
        unique_name: uniqueName,
        iat: Math.floor(Date.now() / 1000),
        role: role,
      },
      { expiresIn: '30m' },
    );

    return newToken;
  }

  //endpoint to check if token is valid (JwtAuthGuard protects the endpoint)
  @Get('status')
  @Roles('customer', 'admin')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Get('refresh/ms')
  @Roles('*')
  @ApiBearerAuth()
  @UseGuards(AzureADGuard)
  async validateToken(@Req() req) {
    let role = 'customer';
    console.log(req.user);
    if (
      req.user.iss ===
      `https://sts.windows.net/${process.env.MSAL_WEB_TENANT_ID}/`
    ) {
      role = 'admin';
    }

    const newToken = this.jwtService.sign(
      {
        unique_name: req.user.unique_name,
        iat: Math.floor(Date.now() / 1000),
        role: role,
      },
      { expiresIn: '30m' },
    );

    return newToken;
  }
}
