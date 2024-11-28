export interface EventProps {
  id: string;
  title: string;
  image: string;
  date: string;
  userId: string;
  name: string;
  content: string;
  picture: string;
  access_code?: string;
  started_at?: string | null;
  ended_at?: string | null;
  address: string | null;
  upload_status: boolean;
}
