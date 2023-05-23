import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private psm: PrismaService, private jwt: JwtService) {}
  async register(dto) {
    await this.psm.user.create({
      data: {
        name: dto.name,
        password: await hash(dto.password),
      },
    });
    return dto;
  }

  async login(dto) {
    const result = await this.psm.user.findUnique({
      where: {
        name: dto.name,
      },
    });
    if (!(await verify(result.password, dto.password))) {
      throw new BadRequestException('密码错误');
    }
    return this.token(result);
  }

  async token({ name, id }) {
    return {
      token: this.jwt.sign({
        name,
        sub: id,
      }),
    };
  }
}
