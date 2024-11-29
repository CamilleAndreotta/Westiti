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
import { UserEventService } from 'src/userevent/userevent.service';
import { UserService } from 'src/user/user.service';

@Controller('/api/event')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly userService: UserService,
    private readonly userEventService: UserEventService,
    private readonly prismaService: PrismaService,
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  public async findAll(@Query() query: { userId: string }) {
    const userId = query.userId;
    return this.userEventService.findUserEvents(userId);
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

    const user = await this.userService.findUserWithParticipations(userId);

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

    const eventId = event.id;
    await this.userEventService.jointEvent(joinEventDto, eventId);

    return this.userEventService.findUserEvents(joinEventDto.userId);
  }

  @Post('/leave')
  public async leaveEvent(@Body() leaveEventDto: LeaveEventDto) {

    const userId = leaveEventDto.userId;
    const user = await this.userService.findUserWithParticipations(userId);

    let eventInDb = null;
    user.participations.map((event) => {
      if (event.eventId === leaveEventDto.eventId) {
        return (eventInDb = event);
      }
    });

    const eventToLeave = eventInDb.id;
    return this.userEventService.leaveEvent(eventToLeave);
  }
}

