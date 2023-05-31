import { JwtStrategy } from '@/auth/strategy/jwt.strategy'
import { PrismaService } from '@/prisma/prisma.service'
import { Module } from '@nestjs/common'
import { CategoryController } from './category.controller'
import { CategoryService } from './category.service'
@Module({
  controllers: [CategoryController],
  providers: [CategoryService, PrismaService, JwtStrategy],
})
export class CategoryModule {}
