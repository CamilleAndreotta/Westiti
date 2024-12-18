type Photos = {
  id: string;
  url: string;
};

export type Event = {
  id: string | null;
  content: string | null;
  picture: string | undefined;
  started_at: Date | null;
  ended_at: Date | null;
  upload_status: boolean;
  access_code: string | null;
  address: string | null;
  name: string | null;
  creator_id?: {
    name: string;
  };
  photos?: [Photos];
  type: string;
};
