import stubImage from '../assets/img/stub-image.png';

import type {
  ApiBooksFullItem,
  ApiBooksLiteData,
} from '../app/store/books/types';

export function transformResBooks({ items }: ApiBooksLiteData) {
  return items
    ? items.map((item) => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors:
          item.volumeInfo.authors?.join(', ') || 'The authors is not specified',
        imageLink: item.volumeInfo.imageLinks?.thumbnail || stubImage,
      }))
    : [];
}

export function transformResBook(item: ApiBooksFullItem) {
  return {
    id: item.id,
    title: item.volumeInfo.title,
    authors:
      item.volumeInfo.authors?.join(', ') || 'The authors is not specified',
    imageLink: item.volumeInfo.imageLinks?.medium || stubImage,
    averageRating: item.volumeInfo.averageRating?.toString() || 'n/a',
    categories:
      item.volumeInfo.categories?.join(', ') || 'Categories are not specified',
    description:
      item.volumeInfo.description || 'The description is not specified',
    pageCount: item.volumeInfo.pageCount?.toString() || 'n/a',
    publishedDate:
      item.volumeInfo.publishedDate || 'The publication date is not specified',
    previewLink: item.volumeInfo.previewLink || '/',
  };
}
