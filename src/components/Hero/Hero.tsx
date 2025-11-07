import env from '@/env'
import cn from '@/utils/cn'
import Image from 'next/image'
import type { FC } from 'react'

import Container from '@/components/Container'

import Flowers1 from './images/flowers-1.png'
import Flowers2 from './images/flowers-2.png'
import Flowers3 from './images/flowers-3.png'

import styles from './Hero.module.scss'

const Hero: FC = () => {
  const diff = env.marriageDate.getTime() - Date.now()
  const days = Math.max(Math.floor(diff / (1000 * 60 * 60 * 24)), 0)

  return (
    <div className={styles.wrapper}>
      <Image
        className={cn(styles.flowers, styles.flowers1)}
        src={Flowers1}
        width={350}
        alt=""
      />
      <Image
        className={cn(styles.flowers, styles.flowers2)}
        src={Flowers2}
        width={550}
        alt=""
      />
      <Image
        className={cn(styles.flowers, styles.flowers3)}
        src={Flowers3}
        width={350}
        alt=""
      />
      <Container className={styles.container}>
        <h1>
          <span className={styles.titleHeader}>Casamento</span>
          <br />
          <strong className={styles.titleName}>Nathália</strong>
          <span className={styles.titleAnd}> & </span>
          <strong className={styles.titleName}>Jhonny</strong>
        </h1>
        <h2 className={styles.subtitle}>Save the Date</h2>
        <span className={styles.legend}>Faltam apenas {days} dias</span>
      </Container>
    </div>
  )
}

export default Hero
