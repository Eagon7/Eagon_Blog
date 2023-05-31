import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticleService {
  constructor(private psm: PrismaService, private config: ConfigService) {}
  async create(createArticleDto: CreateArticleDto) {
    return await this.psm.article.create({
      data: createArticleDto,
    });
  }

  async findAll(
    page = this.config.get('ARTICLE_PAGE'),
    pageSize = this.config.get('ARTICLE_PAGE_SIZE'),
  ) {
    const article = await this.psm.article.findMany({
      // 从第几个开始
      skip: +(page - 1) * pageSize,
      // 返回多少个
      take: +pageSize,
    });
    const total = await this.psm.article.count();
    const allPage = Math.ceil(total / pageSize);
    return {
      meta: {
        page: +page,
        pageSize: +pageSize,
        total,
        allPage: allPage,
        data: article,
      },
    };
  }

  async findOne(id: number) {
    return await this.psm.article.findUnique({ where: { id } });
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    return await this.psm.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  async remove(id: number) {
    return await this.psm.article.delete({ where: { id } });
  }
}
