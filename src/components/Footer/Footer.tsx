import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'

import Logo from './images/logo-light.png'

import styles from './Footer.module.scss'

const Footer: FC = () => (
  <footer className={styles.footer}>
    <Container className={styles.container}>
      <Link href="/">
        <Image
          src={Logo}
          width={110}
          height={45}
          className={styles.logo}
          alt="Página inicial"
        />
      </Link>
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
    </Container>
  </footer>
)

export default Footer
