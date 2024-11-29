import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { UploadFileDto } from './dto/upload-photos.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';

@Injectable()
export class PhotoService {
  constructor(private readonly prismaService: PrismaService) {}
  
  create(createPhotoDto: CreatePhotoDto) {
    return 'This action adds a new photo';
  }

  findAll() {
    return `This action returns all photo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} photo`;
  }

  update(id: number, updatePhotoDto: UpdatePhotoDto) {
    return `This action updates a #${id} photo`;
  }

  remove(id: number) {
    return `This action removes a #${id} photo`;
  }

  createMany(eventId: string, uploadPhotosDto: UploadFileDto) {
    return;
  }

  async findPhotosInEvent(userId: string, eventId: string) {
    return await this.prismaService.photo.findMany({
      where : {
        userId : userId,
        eventId: eventId,
      }
    });
  }

  async deletPhotosInEvent(userId: string, eventId: string) {
    return await this.prismaService.photo.deleteMany({
      where : {
        userId : userId,
        eventId: eventId,
      }
    });
  }

  async findUserPhotos(userId: string){
    return await this.prismaService.photo.findMany({
      where: {
        userId : userId
      }
    })
  }
}

