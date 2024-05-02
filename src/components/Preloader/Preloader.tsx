import s from './Preloader.module.scss';

const Preloader = () => {
  return (
    <div className={s['preloader']}>
      <div className={s['preloader__container']}>
        <span className={s['preloader__round']}></span>
      </div>
    </div>
  );
};

export default Preloader;
