import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ArticleService {
  constructor(private psm: PrismaService, private config: ConfigService) {}
  create(createArticleDto: CreateArticleDto) {
    return this.psm.article.create({ data: createArticleDto });
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

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
