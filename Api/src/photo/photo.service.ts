import { Injectable } from '@nestjs/common';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { UpdatePhotoDto } from './dto/update-photo.dto';
import { UploadPhotosDto } from './dto/upload-photos.dto';

@Injectable()
export class PhotoService {
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

  createMany(eventId: string, uploadPhotosDto: UploadPhotosDto) {
    return;
  }
}
