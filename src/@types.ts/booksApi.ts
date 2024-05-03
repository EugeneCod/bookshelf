interface BooksApiVolumeInfo {
  authors?: string[];
  averageRating: number;
  categories?: string[];
  description: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  pageCount?: number;
  publishedDate: string;
  previewLink: string;
  title: string;
}

interface BooksApiItem {
  id: string;
  volumeInfo: BooksApiVolumeInfo;
}

export interface BooksApiData {
  items: BooksApiItem[];
  kind: string;
  totalItems: number;
}

export interface LocalBookCardData {
  title: string;
  authors: string;
  id: string;
  imageLinks: {
    smallThumbnail: string;
    thumbnail: string;
  };
}

export interface LocalBookFullData extends LocalBookCardData{
  averageRating: string;
  categories: string;
  description: string;
  pageCount: string;
  publishedDate: string;
  previewLink: string;
}