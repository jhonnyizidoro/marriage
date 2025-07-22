'use client'

import env from '@/env'
import Image from 'next/image'
import { type FC, useEffect, useState } from 'react'

import Container from '@/components/Container'

import Border from './images/border.png'

import styles from './Countdown.module.scss'

const Countdown: FC = () => {
  const [data, setData] = useState({
    seconds: '00',
    minutes: '00',
    hours: '00',
    days: '00',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = env.marriageDate.getTime() - Date.now()

      if (diff < 0) {
        return
      }

      const seconds = Math.floor(diff / 1000) % 60
      const minutes = Math.floor(diff / (1000 * 60)) % 60
      const hours = Math.floor(diff / (1000 * 60 * 60)) % 24
      const days = Math.floor(diff / (1000 * 60 * 60 * 24))

      setData({
        seconds: `0${seconds}`.slice(-2),
        minutes: `0${minutes}`.slice(-2),
        hours: `0${hours}`.slice(-2),
        days: `0${days}`.slice(-2),
      })
    }, 1_000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Container className={styles.container}>
      <Image
        className={styles.border}
        src={Border}
        alt=""
        width={200}
        height={200}
      />
      <Image
        className={styles.border}
        src={Border}
        alt=""
        width={200}
        height={200}
      />
      <Image
        className={styles.border}
        src={Border}
        alt=""
        width={200}
        height={200}
      />
      <Image
        className={styles.border}
        src={Border}
        alt=""
        width={200}
        height={200}
      />

      <h2 className={styles.title}>
        Estamos contanto os
        <br />
        segundos
      </h2>

      <div className={styles.list}>
        <div className={styles.item}>
          <strong className={styles.number}>{data.days}</strong>
          <span className={styles.label}>Dias</span>
        </div>
        <div className={styles.item}>
          <strong className={styles.number}>{data.hours}</strong>
          <span className={styles.label}>Horas</span>
        </div>
        <div className={styles.item}>
          <strong className={styles.number}>{data.minutes}</strong>
          <span className={styles.label}>Minutos</span>
        </div>
        <div className={styles.item}>
          <strong className={styles.number}>{data.seconds}</strong>
          <span className={styles.label}>Segundos</span>
        </div>
      </div>
    </Container>
  )
}

export default Countdown
