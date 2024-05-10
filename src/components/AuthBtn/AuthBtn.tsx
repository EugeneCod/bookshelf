import s from './AuthBtn.module.scss';

interface Props {
  text: string;
  id: string;
  onClick: () => void;
}
const AuthBtn = (props: Props) => {
  const { text, onClick, id } = props;
  return (
    <button id={id} className={s['button']} type="button" onClick={onClick}>
      {text}
    </button>
  );
};

export default AuthBtn;
