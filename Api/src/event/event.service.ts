import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import ShortUniqueId from 'short-unique-id';
import { cp } from 'fs';
import { response } from 'express';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEventDto: CreateEventDto) {
    // traitement la photo

    const formattedStartedDate = new Date(createEventDto.started_at);
    const formattedEndedDate = new Date(createEventDto.ended_at);

    //let eventAccessCode = new ShortUniqueId({ length: 6 });

    let eventExistInDB = null;
    let eventAccessCode = null;
    do {
      const generateCode = new ShortUniqueId({ length: 6 });
      eventAccessCode = generateCode.rnd();
      eventExistInDB = await this.prismaService.event.findFirst({
        where: {
          access_code: eventAccessCode,
        },
      });
    } while (eventExistInDB !== null);

    const event = await this.prismaService.event.create({
      data: {
        name: createEventDto.name,
        content: createEventDto.content,
        started_at: formattedStartedDate,
        ended_at: formattedEndedDate,
        picture: createEventDto.picture,
        access_code: eventAccessCode,
        upload_status: true,
        creator_id: {
          connect: {
            id: createEventDto.creator_id,
          },
        },
      },
    });

    return await this.prismaService.userevent.create({
      data: {
        user_id: {
          connect: {
            id: createEventDto.creator_id,
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

  // findAll() {
  //   return `This action returns all event`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} event`;
  // }

  // update(id: number, updateEventDto: UpdateEventDto) {
  //   return `This action updates a #${id} event`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} event`;
  // }
}
