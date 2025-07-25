import type { FC } from 'react'

import LoaderIcon from '@/assets/icons/LoaderIcon'

import styles from './Loader.module.scss'

const Loader: FC = () => (
  <div className={styles.wrapper}>
    <LoaderIcon className={styles.icon} width={50} />
  </div>
)

export default Loader
