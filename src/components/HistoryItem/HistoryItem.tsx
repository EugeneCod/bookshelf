import { Link } from 'react-router-dom';

import { ROUTES } from '../../utils/constants';

import s from './HistoryItem.module.scss';

interface Props {
  searchQuery: string;
  historyId: string;
  dateTime: string;
  onRemove: (historyId: string) => void;
}

const HistoryItem = (props: Props) => {
  const {searchQuery, historyId, dateTime, onRemove} = props;
  return (
    <Link
      to={`${ROUTES.SEARCH}?q=${searchQuery}`}
      className={s['item']}
    >
      <button
        className={s['item__remove-btn']}
        type="button"
        onClick={() => {
          onRemove(historyId);
        }}
      ></button>
      <p className={s['item__search-query']}>"{searchQuery}"</p>
      <p className={s['item__datetime']}>{dateTime}</p>
    </Link>
  );
};

export default HistoryItem;
