import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  public async create(createUserDto: CreateUserDto) {
    return this.prismaService.user.upsert({
      where: {
        email: createUserDto.email,
      },
      update: {},
      create: {
        name: createUserDto.name,
        email: createUserDto.email,
        password: createUserDto.password,
        avatar: 'test',
      },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: string) {
    return this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserDto,
        updated_at: new Date(),
      },
    });
  }

  remove(id: string) {
    return this.prismaService.user.delete({
      where: { id },
    });
  }
}
