import type { FC } from 'react'

import styles from './not-found.module.scss'

const NotFoundPage: FC = () => (
  <div className={styles.wrapper}>
    <h1 className={styles.title}>404</h1>
    <h2 className={styles.text}>Oops, essa página não existe 😭</h2>
  </div>
)

export default NotFoundPage
