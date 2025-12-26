import getProducts from '@/utils/store/getProducts'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'
import ProductCard from '@/components/ProductCard'

import styles from './StoreCTA.module.scss'

const StoreCTA: FC = async () => {
  const products = await getProducts({ limit: 3 })

  return (
    <div className={styles.wrapper}>
      <Container className={styles.container}>
        <div>
          <h2 className={styles.title}>Lista de presentes</h2>
          <p className={styles.text}>
            A presença de vocês no nosso grande dia é o que mais importa para
            nós. Estar cercados por pessoas tão especiais já é um presente
            enorme. Caso queiram nos presentear ainda mais, preparamos esta
            lista com muito carinho para ajudar no início da nossa vida juntos.
            Fiquem à vontade para escolher o que mais combinar com vocês.
          </p>
          <Link className={styles.cta} href="/lista-de-presentes">
            Lista de presentes
          </Link>
        </div>
        <div className={styles.list}>
          {products?.map((p) => (
            <ProductCard
              price={p.price}
              title={p.title}
              url="/lista-de-presentes"
              image={p.image}
              key={p.id}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default StoreCTA
