import { memo } from 'react';
import PropTypes from 'prop-types';
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
  const { searchQuery, historyId, dateTime, onRemove } = props;
  return (
    <li className={s['item']}>
      <button
        className={s['item__remove-btn']}
        type="button"
        onClick={() => {
          onRemove(historyId);
        }}
      ></button>
      <Link
        className={s['item__link']}
        to={`${ROUTES.SEARCH}?q=${searchQuery}`}
      >
        <p className={s['item__search-query']}>"{searchQuery}"</p>
        <p className={s['item__datetime']}>{dateTime}</p>
      </Link>
    </li>
  );
};

export default memo(HistoryItem);

HistoryItem.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  historyId: PropTypes.string.isRequired,
  dateTime: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
};
