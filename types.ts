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

export interface Story {
  id: string;
  title: string;
  source: string;
  date?: string;
  coverImage: string;
  content: {
    type: 'paragraph' | 'header' | 'image' | 'quote' | 'link' | 'project-link';
    value: string;
    url?: string;
    projectId?: string;
    caption?: string;
  }[];
}

export enum ScrollDirection {
  UP = 'UP',
  DOWN = 'DOWN',
}