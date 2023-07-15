import { Article } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/master-data/users/entities/user.entity';
import { Exclude } from 'class-transformer';

export class ArticleEntity implements Article {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  @Exclude()
  authorId: number | null;

  @ApiProperty({ required: false, type: UserEntity })
  author?: UserEntity;

  constructor(partial?: Partial<ArticleEntity>) {
    Object.assign(this, partial);

    if (partial?.author) {
      this.author = new UserEntity(partial.author);
    }
  }

  collection(partials: Partial<Article[]>) {
    return partials.map((item) => new ArticleEntity(item)) || [];
  }
}
