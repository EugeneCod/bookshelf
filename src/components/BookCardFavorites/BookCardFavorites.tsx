import { useGetBookByIdQuery } from '../../app/store/books/booksApi';
import BookCard from '../BookCard/BookCard';

interface Props {
  bookId: string;
}

const BookCardFavorites = (props: Props) => {
  const { bookId } = props;

  const { data: booksData } = useGetBookByIdQuery(bookId);

  if (booksData) {
    const { id, title, authors, imageLink } = booksData;
    return <BookCard card={{ id, title, authors, imageLink }} />;
  } else {
    return <></>;
  }
};

export default BookCardFavorites;
