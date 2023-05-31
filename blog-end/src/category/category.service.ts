import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class CategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.prisma.category.create({
      data: {
        name: createCategoryDto.name,
      },
    })
  }

  async findAll() {
    await this.prisma.category.findMany()
  }

  async findOne(id: number) {
    await this.prisma.category.findUnique({
      where: {
        id,
      },
    })
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    await this.prisma.category.update({
      where: {
        id,
      },
      data: {
        name: updateCategoryDto.name,
      },
    })
  }

  async remove(id: number) {
    await this.prisma.category.delete({
      where: {
        id,
      },
    })
  }
}
