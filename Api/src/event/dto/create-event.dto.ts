export class CreateEventDto {
  name: string;
  content: string;
  started_at: Date;
  ended_at: Date;
  picture: string;
  creator_id: string;
}
