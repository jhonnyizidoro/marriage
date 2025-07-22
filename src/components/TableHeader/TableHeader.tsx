import Image from 'next/image'
import type { FC, PropsWithChildren } from 'react'

import Detail from './images/detail.png'

import styles from './TableHeader.module.scss'

const TableHeader: FC<PropsWithChildren> = ({ children }) => (
  <div className={styles.header}>
    <Image
      width={125}
      height={34}
      alt=""
      src={Detail}
      className={styles.detail}
    />
    <strong className={styles.title}>{children}</strong>
    <Image
      width={125}
      height={34}
      alt=""
      src={Detail}
      className={styles.detail}
    />
  </div>
)

export default TableHeader
