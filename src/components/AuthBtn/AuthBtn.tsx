import s from './AuthBtn.module.scss';

interface Props {
  text: string;
  onClick: () => void;
}
const AuthBtn = (props: Props) => {
  const { text, onClick } = props;
  return (
    <button className={s['button']} type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default AuthBtn;
