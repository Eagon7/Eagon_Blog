import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Redirect,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { LoginDTO } from 'src/dto/login.dto';
import { RegisterDTO } from 'src/dto/register.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
// import { JwtStrategy } from 'src/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private config: ConfigService, private service: AuthService) {}
  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.service.register(dto);
  }

  @Post('login')
  @UseGuards(AuthGuard('jwt'))
  login(@Body() dto: LoginDTO) {
    return this.service.login(dto);
  }

  @Get('a')
  a() {
    return 'Result A';
  }

  @Get('eagon')
  @Redirect('/auth/a', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      console.log(version);
      return { url: '/auth/login' };
    }
  }
}
