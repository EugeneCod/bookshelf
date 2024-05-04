import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Suggestions from '../Suggestions/Suggestions';
import { useDebounce } from '../../hooks/useDebounce';
import { ROUTES } from '../../utils/constants';

import s from './SearchForm.module.scss';

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestionsOpened, setSuggestionsOpened] = useState(false);
  const navigate = useNavigate();
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  function handleChangeInput(evt: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(evt.target.value);
    setSuggestionsOpened(true);
  }

  function handleBlurInput() {
    setTimeout(() => setSuggestionsOpened(false), 500);
  }

  function handleFocusInput() {
    searchQuery && setSuggestionsOpened(true);
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    searchQuery && searchBooks();
  }

  function searchBooks() {
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
      />
      <button className={s['search__btn']} type="submit">
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
