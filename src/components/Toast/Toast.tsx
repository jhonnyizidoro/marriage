'use client'

import cn from '@/utils/cn'
import { type FC } from 'react'

import CloseIcon from '@/assets/icons/CloseIcon'

import styles from './Toast.module.scss'

export type Props = {
  message: string
  bottom: number
}

const Toast: FC<Props> = ({ message, bottom }) => (
  <div
    className={cn('__TOAST__', styles.toast)}
    style={{ bottom, zIndex: bottom / 10 + 5, right: bottom }}
  >
    <button type="button" aria-label="Fechar" className={styles.closeButton}>
      <CloseIcon width={15} />
    </button>
    <span className={styles.message}>
      <strong>Erro: </strong>
      {message}
    </span>
  </div>
)
export default Toast
