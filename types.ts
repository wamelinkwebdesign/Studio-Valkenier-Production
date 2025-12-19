export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  role: string;
  thumbnail: string;
  videoPreview?: string;
  videoFull?: string;
  description: string;
  images?: string[];
}

export enum ScrollDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}