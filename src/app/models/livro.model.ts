export interface Livro {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: string;
}

export interface VolumeInfo {
  title: string;
  subtitle?: string;
  authors: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  pageCount?: number;
  allowAnonLogging: boolean;
  contentVersion: string;
  imageLinks?: ImageLinks;
  previewLink: string;
  infoLink: string;
  canonicalVolumeLink: string;
  categories?: string[];
  averageRating?: number;
  ratingsCount?: number;
}

export interface ImageLinks {
  smallThumbnail: string;
  thumbnail: string;
}

export interface Item {
  volumeInfo: VolumeInfo;
}

export interface LivrosResultado {
  items: Item[];
  totalItems: number;
}
