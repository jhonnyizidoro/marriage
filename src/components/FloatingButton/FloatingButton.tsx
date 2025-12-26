'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { type FC } from 'react'

import GiftIcon from '@/assets/icons/GiftIcon'

import styles from './FloatingButton.module.scss'

const FloatingButton: FC = () => {
  const searchParams = useSearchParams()
  const isConfirming = searchParams.get('modal') === 'confirm'

  if (isConfirming) {
    return
  }

  return (
    <Link href="/lista-de-presentes" className={styles.button}>
      <GiftIcon width={20} className={styles.icon} />
      <span className={styles.text}>Lista de presentes</span>
    </Link>
  )
}

export default FloatingButton
