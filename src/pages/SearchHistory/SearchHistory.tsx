import { HistoryItem } from '../../components';
import { useHistory } from '../../hooks/useHistory';
import { Status } from '../../app/@types/';

import s from './SearchHistory.module.scss';

const SearchHistory = () => {
  const { history, status, error, removeHistory, clearHistory } = useHistory();

  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>Your past search queries</h1>
        <div className={s['history']}>
          {!!history.length && (
            <button
              className={s['history__clear-btn']}
              type="button"
              onClick={clearHistory}
            >
              Clear
            </button>
          )}
          <ul className={s['history__list']}>
            {history.map(({ historyId, dateTime, searchQuery }) => (
              <HistoryItem
                key={historyId}
                historyId={historyId}
                dateTime={dateTime}
                searchQuery={searchQuery}
                onRemove={removeHistory}
              />
            ))}
          </ul>
          {history.length === 0 && (
            <p className={s['history__no-data']}>
              There is no request history...
            </p>
          )}
          {status === Status.FAILED && (
            <p className={s['history__error']}>{error}</p>
          )}
        </div>
      </div>
    </main>
  );
};

export default SearchHistory;
