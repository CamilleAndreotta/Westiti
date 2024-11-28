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
  Query,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JoinEventDto } from './dto/joint-event.dto';
import { LeaveEventDto } from './dto/leave-event.dto';

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
  public async findAll(@Query() query: { userId: string }) {
    const userId = query.userId;

    return await this.prismaService.userevent.findMany({
      where: {
        userId: userId,
      },
      include: {
        event_id: true,
      },
    });
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

  @Post('/join')
  public async joinEvent(@Body() joinEventDto: JoinEventDto) {
    const event = await this.prismaService.event.findFirst({
      where: {
        access_code: joinEventDto.access_code,
      },
    });

    if (!event) {
      throw new UnauthorizedException({
        message: "Cet événememt n'existe pas",
      });
    }

    return await this.prismaService.userevent.create({
      data: {
        user_id: {
          connect: {
            id: joinEventDto.userId,
          },
        },
        event_id: {
          connect: {
            id: event.id,
          },
        },
      },
    });
  }

  @Post('/leave')
  public async leaveEvent(@Body() leaveEventDto: LeaveEventDto) {
    const user = await this.prismaService.user.findFirst({
      where: {
        id: leaveEventDto.userId,
      },
      include: {
        participations: true,
      },
    });

    let eventInDb = null;
    user.participations.map((event) => {
      if (event.eventId === leaveEventDto.eventId) {
        return (eventInDb = event);
      }
    });

    return await this.prismaService.userevent.delete({
      where: {
        id: eventInDb.id,
      },
    });
  }
}
/* 
  // vérifier si l'utilisateur a uploadé des photos
    return await this.prismaService.userevent.delete({
      where: {
        user_id: user,
        event_id: event,
      }
})
 */
