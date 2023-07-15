import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @Exclude()
  password: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(partial?: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  collection(partials?: Partial<User[]>) {
    return partials.map((item) => new UserEntity(item)) || [];
  }
}
