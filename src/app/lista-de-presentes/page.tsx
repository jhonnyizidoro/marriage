import getProducts from '@/utils/store/getProducts'
import type { FC } from 'react'

import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'

import styles from './page.module.scss'

const ProductsPage: FC = async () => {
  const products = await getProducts({ limit: 99 })

  return (
    <Container size="medium" className={styles.wrapper}>
      {[...(products || []), ...(products || []), ...(products || [])]?.map(
        (p) => (
          <ProductCard
            key={p.id}
            url={p.url}
            title={p.title}
            image={p.image}
            price={p.price}
          />
        )
      )}
    </Container>
  )
}

export default ProductsPage
