import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import Placeholder from './images/placeholder.jpg'

import styles from './ProductCard.module.scss'

type Props = {
  image?: string
  title: string
  price?: string
  url: string
}

const ProductCard: FC<Props> = ({ price, title, image, url }) => (
  <Link href={url} className={styles.item}>
    <Image
      className={styles.image}
      src={image || Placeholder}
      alt={title}
      width={1000}
      height={1000}
    />
    <div className={styles.content}>
      <h3 className={styles.title}>{title}</h3>
      <span className={styles.price}>{Number(price).toFixed(2)}</span>
    </div>
  </Link>
)

export default ProductCard
