import env from '@/env'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'

import Logo from './images/logo.png'

import styles from './Nav.module.scss'

const Nav: FC = () => (
  <nav>
    <Container className={styles.container}>
      <div className={styles.links}>
        <Link className={styles.link} href="/">
          Início
        </Link>
        <Link className={styles.link} href="/como-chegar">
          Como chegar
        </Link>
        <Link className={styles.link} href="/vestimentas">
          Vestimentas
        </Link>
        <Link className={styles.link} href="/galeria">
          Galeria de fotos
        </Link>
      </div>
      <Link href="/">
        <Image
          src={Logo}
          width={110}
          height={45}
          className={styles.logo}
          alt="Página inicial"
        />
      </Link>
      <div className={styles.buttonWrapper}>
        <Link className={styles.button} href={env.storeUrl}>
          Lisa de compras
        </Link>
      </div>
    </Container>
  </nav>
)

export default Nav
