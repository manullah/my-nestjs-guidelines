import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryArticleDto } from './dto/query-article.dto';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { Article, Prisma } from '@prisma/client';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto): Promise<Article> {
    return this.prisma.article.create({ data: createArticleDto });
  }

  async findAll(queryDto: QueryArticleDto): Promise<PaginatedResult<Article>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    // query conditions
    const where: Prisma.ArticleWhereInput = {
      published: !queryDto.isDraft,
    };
    if (queryDto.search) {
      where.OR = [
        { title: { contains: queryDto.search } },
        { description: { contains: queryDto.search } },
      ];
    }

    const articles = await paginate<Article, Prisma.ArticleFindManyArgs>(
      this.prisma.article,
      {
        where,
        orderBy: queryDto.getOrderBy,
        include: {
          author: true,
        },
      },
    );

    return articles;
  }

  findOne(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number): Promise<Article> {
    return this.prisma.article.delete({ where: { id } });
  }
}
