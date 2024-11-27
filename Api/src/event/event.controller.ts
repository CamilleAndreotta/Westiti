import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UnauthorizedException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Photos, UploadPhotosDto } from 'src/photo/dto/upload-photos.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('/api/event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }

  @Post(':id/upload')
  public async uploadPhotos(
    @Param('id') id: string,
    @Body() uploadPhotosDto: UploadPhotosDto,
  ) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: uploadPhotosDto.userId,
      },
      include: {
        participations: true,
      },
    });

    const isEventParticipant = user?.participations.some(
      (event) => event.eventId === id,
    );

    if (!isEventParticipant) {
      throw new UnauthorizedException({
        message: "Vous ne pouvez pas uploader d'image sur cet événement",
      });
    }

    const havePhotosSubmitted = !(
      Object.values(uploadPhotosDto.photos).length === 0
    )
      ? true
      : false;

    if (!havePhotosSubmitted) {
      throw new UnauthorizedException({
        message: "Aucune photo n'a été soumise",
      });
    }

    // Si oui on lance multer pour sauvegarder les photos et récupérer les urls

    // On fait muter le uploadPhotoDto pour affecter l'url de la photo à la bonne photo

    // On sauvegarder les informations en BDD
    //return this.eventService.uploadPhotos(id, uploadPhotosDto);
  }
}
