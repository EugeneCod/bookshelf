import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useGetBooksQuery } from '../../app/store/books/booksApi';
import { ROUTES } from '../../utils/constants';

import s from './Suggestions.module.scss';

interface Props {
  searchQuery: string;
  onClose: () => void;
}

const Suggestions = (props: Props) => {
  const { searchQuery, onClose } = props;

  const {
    data: booksData,
    isLoading,
    isError,
  } = useGetBooksQuery(
    {
      search: searchQuery,
    },
    { skip: !searchQuery },
  );

  function handleLinkCLick() {
    onClose();
  }

  return (
    <div data-testid="suggestions" className={s['menu']}>
      {!!booksData && booksData.length !== 0 && (
        <>
          <p className={s['menu__title']}>Perhaps you were looking for</p>
          <ul className={s['menu__list']}>
            {booksData.map((book) => {
              return (
                <Link
                  to={`${ROUTES.BOOK}/${book.id}`}
                  onClick={handleLinkCLick}
                  className={s['menu-card']}
                  key={book.id}
                  data-testid={`${book.id}`}
                >
                  <img
                    className={s['menu-card__image']}
                    src={book.imageLink}
                    alt="Book сover"
                  />
                  <p className={s['menu-card__title']}>{book.title}</p>
                  <p className={s['menu-card__authors']}>{book.authors}</p>
                </Link>
              );
            })}
          </ul>
        </>
      )}
      {booksData?.length === 0 && (
        <p className={s['menu__message']}>Nothing was found for your query</p>
      )}
      {isLoading && <p className={s['menu__preloader']}>Searching...</p>}
      {isError && <p className={s['menu__error']}>An error has occurred!</p>}
    </div>
  );
};

export default Suggestions;

Suggestions.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
