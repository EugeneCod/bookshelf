interface ImageLinksLite {
  smallThumbnail: string;
  thumbnail: string;
}

interface ImageLinksFull extends ImageLinksLite {
  small: string;
  medium: string;
  large: string;
  extraLarge: string;
}

interface ApiBooksLiteVolumeInfo {
  authors?: string[];
  imageLinks?: ImageLinksLite;
  title: string;
}

interface ApiBooksFullVolumeInfo extends ApiBooksLiteVolumeInfo {
  averageRating: number;
  categories?: string[];
  description: string;
  pageCount?: number;
  publishedDate: string;
  previewLink: string;
  imageLinks?: ImageLinksFull;
}

interface ApiBooksLiteItem {
  id: string;
  volumeInfo: ApiBooksLiteVolumeInfo;
}

export interface ApiBooksFullItem {
  id: string;
  volumeInfo: ApiBooksFullVolumeInfo;
}

export interface ApiBooksLiteData {
  items?: ApiBooksLiteItem[];
  kind: string;
  totalItems: number;
}

export interface SearchQuery {
  search?: string;
  maxResults?: number;
  startIndex?: number;
}

export interface LocalBookShortData {
  title: string;
  authors: string;
  id: string;
  imageLink: string;
}

export interface LocalBookFullData extends LocalBookShortData {
  averageRating: string;
  categories: string;
  description: string;
  pageCount: string;
  publishedDate: string;
  previewLink: string;
}
