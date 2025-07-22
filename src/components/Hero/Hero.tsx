import cn from '@/utils/cn'
import Image from 'next/image'
import type { FC } from 'react'

import Container from '@/components/Container'

import Image1 from './images/1.jpeg'
import Image2 from './images/2.jpeg'
import Image3 from './images/3.jpeg'
import Image4 from './images/4.jpeg'
import Image5 from './images/5.jpeg'

import styles from './Hero.module.scss'

const Hero: FC = () => (
  <Container className={styles.container}>
    <div className={styles.left}>
      <Image src={Image1} alt="" className={cn(styles.image, styles.image1)} />
      <Image src={Image2} alt="" className={cn(styles.image, styles.image2)} />
    </div>
    <div>
      <h1 className={styles.title}>
        <span className={styles.titleHeader}>Casamento</span>
        <br />
        <strong className={styles.titleName1}>Jhonny</strong>
        <span className={styles.titleAnd}> &</span>
        <br />
        <strong className={styles.titleName2}>Nathália</strong>
      </h1>
    </div>
    <div className={styles.right}>
      <Image src={Image3} alt="" className={cn(styles.image, styles.image3)} />
      <Image src={Image4} alt="" className={cn(styles.image, styles.image4)} />
      <Image src={Image5} alt="" className={cn(styles.image, styles.image5)} />
    </div>
  </Container>
)

export default Hero
