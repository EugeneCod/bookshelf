import s from './Toggle.module.scss';

interface Props {
  value: boolean;
  onChange: () => void;
}

const Toggle = (props: Props) => {
  const { value, onChange } = props;
  return (
    <label className={s['switch']}>
      <input type="checkbox" onClick={onChange} checked={value} />
      <span className={s['slider']}></span>
    </label>
  );
};

export default Toggle;
