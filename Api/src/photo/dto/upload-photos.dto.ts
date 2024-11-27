export class UploadPhotosDto {
  photos: Photo[];
  userId: string;
}

export class Photos {
  photos: Test[];
}

interface Test {
  name: string;
  size: string;
  type: string;
}

interface Photo {
  name: string;
  size: string;
  type: string;
  userId: string;
  eventId: string;
  uploaded_at: string;
  url: string;
  status: boolean;
}
