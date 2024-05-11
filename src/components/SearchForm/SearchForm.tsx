import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import Suggestions from '../Suggestions/Suggestions';
import { useDebounce } from '../../hooks/useDebounce';
import { useHistory } from '../../hooks/useHistory';
import { ROUTES } from '../../utils/constants';
import { useAppSelector } from '../../app/store/hooks';
import { selectUserIsAuth } from '../../app/store/user/selectors';

import s from './SearchForm.module.scss';

const SearchForm = () => {
  const [URLSearchParams] = useSearchParams();
  const searchQueryFromParams = URLSearchParams.get('q') ?? '';
  const [searchQuery, setSearchQuery] = useState(searchQueryFromParams);
  const [suggestionsOpened, setSuggestionsOpened] = useState(false);
  const navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const { addHistory } = useHistory();
  const isAuth = useAppSelector(selectUserIsAuth);

  useEffect(() => {
    setSearchQuery(searchQueryFromParams);
  }, [searchQueryFromParams]);

  useEffect(() => {
    debouncedSearchQuery && setSuggestionsOpened(true);;
  }, [debouncedSearchQuery]);

  function handleChangeInput(evt: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(evt.target.value);
  }

  function handleBlurInput() {
    setTimeout(() => setSuggestionsOpened(false), 100);
  }

  function handleFocusInput() {
    searchQuery && setSuggestionsOpened(true);
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setSuggestionsOpened(false);
    if (searchQueryFromParams === searchQuery) {
      return;
    }
    searchBooks();
    if (isAuth) {
      const currentDate = new Date();
      const dateTime = `${currentDate.toTimeString().slice(0, 8)},
      ${currentDate.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`;

      addHistory({ dateTime, searchQuery });
    }
  }

  function searchBooks(): void {
    const encodeSearchQuery = encodeURIComponent(searchQuery);
    navigate(`${ROUTES.SEARCH}?q=${encodeSearchQuery}`);
  }

  return (
    <form className={s['search']} onSubmit={handleSubmit}>
      <input
        className={s['search__input']}
        placeholder="Search on the bookshelf"
        value={searchQuery}
        onChange={handleChangeInput}
        onBlur={handleBlurInput}
        onFocus={handleFocusInput}
        data-testid="search-input"
      />
      <button
        disabled={!searchQuery}
        className={s['search__btn']}
        type="submit"
      >
        Find
      </button>
      {suggestionsOpened && (
        <div className={s['search__suggestions-container']}>
          <Suggestions searchQuery={debouncedSearchQuery} />
        </div>
      )}
    </form>
  );
};

export default SearchForm;
