import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import { Prisma, User } from '@prisma/client';
import { QueryUserDto } from './dto/query-user.dto';
import { PaginatedResult, createPaginator } from 'prisma-pagination';
import { hashPassword } from 'src/lib/helpers';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await hashPassword(createUserDto.password);

    createUserDto.password = hashedPassword;

    return this.prisma.user.create({
      data: createUserDto,
    });
  }

  async findAll(queryDto: QueryUserDto): Promise<PaginatedResult<User>> {
    const paginate = createPaginator({
      perPage: queryDto.perPage,
      page: queryDto.page,
    });

    // query conditions
    const where: Prisma.UserWhereInput = {};
    if (queryDto.search) {
      where.OR = [
        { name: { contains: queryDto.search } },
        { email: { contains: queryDto.search } },
      ];
    }

    const users = await paginate<User, Prisma.UserFindManyArgs>(
      this.prisma.article,
      {
        where,
        orderBy: queryDto.getOrderBy,
        include: {
          articles: true,
        },
      },
    );

    return users;
  }

  findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await hashPassword(updateUserDto.password);
    }

    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }
}
