export type RoomRes = {
  id: string;
  code: string;
  quizzId: string;
  createdBy: string;
  isActive: boolean;
};

export type Participant = {
  username: string;
  score: number;
  roomId: string;
};
