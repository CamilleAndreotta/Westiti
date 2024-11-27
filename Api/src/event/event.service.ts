import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import ShortUniqueId from 'short-unique-id';
import { UploadPhotosDto } from 'src/photo/dto/upload-photos.dto';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createEventDto: CreateEventDto) {
    // traitement la photo
console.log(createEventDto)
    const formattedStartedDate = new Date(
      createEventDto.started_at.toString().replace('T', ' '),
    );
    const formattedEndedDate = new Date(
      createEventDto.ended_at.toString().replace('T', ' '),
    );

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
        address: createEventDto.address,
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

  findAll() {
    return this.prismaService.event.findMany();
  }

  findOne(id: string) {
    return this.prismaService.event.findUnique({
      where: {
        id: id,
      },
    });
  }

  public async update(id: string, updateEventDto: UpdateEventDto) {
    const eventInDB = await this.prismaService.event.findUnique({
      where: {
        id: id,
      },
    });

    let formattedStartedDate = new Date(
      updateEventDto.started_at.toString().replace('T', ' '),
    );
    if (
      updateEventDto.started_at === undefined ||
      updateEventDto.started_at === null
    ) {
      formattedStartedDate = eventInDB.started_at;
    }

    let formattedEndedDate = new Date(
      updateEventDto.ended_at.toString().replace('T', ' '),
    );
    if (
      updateEventDto.ended_at === undefined ||
      updateEventDto.ended_at === null
    ) {
      formattedEndedDate = eventInDB.ended_at;
    }

    return this.prismaService.event.update({
      where: {
        id,
      },
      data: {
        name: updateEventDto.name,
        content: updateEventDto.content,
        address: updateEventDto.address,
        started_at: formattedStartedDate,
        ended_at: formattedEndedDate,
        picture: updateEventDto.picture,
        upload_status: true,
      },
    });
  }

  public async remove(id: string) {
    await this.prismaService.userevent.deleteMany({
      where: {
        eventId: id,
      },
    });

    return this.prismaService.event.delete({
      where: { id },
    });
  }

  public async uploadPhotos(id: string, uploadPhotosDto: UploadPhotosDto) {
    const currentDate = new Date().toISOString();

    const photos = Object.values(uploadPhotosDto.photos);
    photos.map((photo) => {
      delete photo.name;
      delete photo.size;
      delete photo.type;
      photo.userId = uploadPhotosDto.userId;
      photo.eventId = id;
      photo.uploaded_at = currentDate;
      photo.url = 'test';
      photo.status = false;
    });
    console.log(photos);

    await this.prismaService.photo.createMany({
      data: photos,
      skipDuplicates: true,
    });
  }
}
