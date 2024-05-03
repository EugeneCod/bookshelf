import classNames from 'classnames/bind';

import s from './LikeBtn.module.scss';

interface Props {
  isLiked: boolean;
  className?: string;
  onClick: () => void;
}

const LikeBtn = (props: Props) => {
  const { isLiked, onClick, className } = props;

  const cx = classNames.bind(s);

  const cardLikeButtonClassName = cx({
    'button': true,
    'button_active': isLiked,
    className,
  });
  return (
    <button
      type="button"
      className={cardLikeButtonClassName}
      onClick={onClick}
    />
  );
};

export default LikeBtn;
