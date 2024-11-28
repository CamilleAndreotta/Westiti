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
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { fileURLToPath } from 'url';
import { diskStorage } from 'multer';
import { existsSync, mkdirSync } from 'fs';
import { extname } from 'path';

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

  @Post(':id/user/:userId/upload')
  @UseInterceptors(FilesInterceptor('file'))
  public async uploadPhotos(
    @UploadedFiles() file,
    @Param('id') id: string,
    @Param('userId') userId: string,
  ) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: userId,
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

    if (!file) {
      throw new UnauthorizedException({
        message: "Aucune photo n'a été envoyée",
      });
    }
    return this.eventService.uploadPhotos(id, userId, file);
  }
}
