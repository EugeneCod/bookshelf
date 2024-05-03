import s from './NotFound.module.scss';

const NotFound = () => {
  return (
    <div className={s['root']}>
      <h1 className={s['errorCode']}>404</h1>
      <p className={s['errorDescription']}>Page not found</p>
    </div>
  )
}

export default NotFound