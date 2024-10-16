export interface FileSync {
  id: number;
  userId: number;
  filepath: string;
  etag: string;
  createdAt: Date;
  updatedAt: Date;
}
