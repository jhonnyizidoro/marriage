import env from '@/env'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'

import Image1 from './images/1.webp'
import Image2 from './images/2.webp'
import Image3 from './images/3.webp'

import styles from './StoreCTA.module.scss'

const products = [
  {
    name: 'Cafeteira Nespresso',
    value: 199.9,
    image: Image1,
  },
  {
    name: 'AirFryer Britânia',
    value: 350.9,
    image: Image2,
  },
  {
    name: 'Mesa de centro ',
    value: 229.9,
    image: Image3,
  },
]

const StoreCTA: FC = () => (
  <div className={styles.wrapper}>
    <Container className={styles.container}>
      <div className={styles.content}>
        <h2 className={styles.title}>Lista de presentes</h2>
        <p className={styles.text}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic.
        </p>
        <Link className={styles.cta} target="_blank" href={env.storeUrl}>
          Lista de presentes
        </Link>
      </div>
      <div className={styles.list}>
        {[...products, ...products, ...products].map((p, i) => (
          <Link
            target="_blank"
            href={env.storeUrl}
            key={i}
            className={styles.item}
          >
            <Image
              className={styles.image}
              src={p.image}
              alt=""
              width={1000}
              height={1000}
            />
            <div className={styles.itemContent}>
              <h3 className={styles.itemTitle}>{p.name}</h3>
              <span className={styles.itemPrice}>{p.value.toFixed(2)}</span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  </div>
)

export default StoreCTA
