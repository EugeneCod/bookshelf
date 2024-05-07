import { Preloader, HistoryItem } from '../../components';
import { useHistory } from '../../hooks/useHistory';
import { Status } from '../../app/store/history/types';

import s from './SearchHistory.module.scss';

const SearchHistory = () => {
  const { history, status, error, removeHistory, clearHistory } = useHistory();
  let content: JSX.Element;
  if (status === Status.LOADING) {
    content = <Preloader />;
  } else if (status === Status.SUCCESS && history.length) {
    content = (
      <>
        <button
          className={s['history__clear-btn']}
          type="button"
          onClick={clearHistory}
        >
          Clear
        </button>
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
      </>
    );
  } else if (status === Status.FAILED) {
    content = <p className={s['history__error']}>{error}</p>;
  } else {
    content = (
      <p className={s['history__no-data']}>There is no request history</p>
    );
  }
  return (
    <main className={s['page']}>
      <div className={s['page__container']}>
        <h1 className={s['page__title']}>Your past search queries</h1>
        <div className={s['history']}>{content}</div>
      </div>
    </main>
  );
};

export default SearchHistory;
