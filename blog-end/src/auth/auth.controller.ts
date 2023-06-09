import { Body, Controller, Get, Post, Query, Redirect, Req, Res, UseGuards } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from '@nestjs/passport'
import { LoginDTO } from '@/auth/dto/login.dto'
import { RegisterDTO } from '@/auth/dto/register.dto'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { Auth } from '@/decorate/auth.decorate'
import { Role } from './enum/role'
// import { JwtStrategy } from 'src/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor(private config: ConfigService, private service: AuthService) {}

  @Post('register')
  register(@Body() dto: RegisterDTO) {
    return this.service.register(dto)
  }

  @Post('login')
  login(@Body() dto: LoginDTO) {
    return this.service.login(dto)
  }

  @Get('eagon')
  @Redirect('/auth/a', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      console.log(version)
      return { url: '/auth/login' }
    }
  }
}
