import env from '@/env'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'
import LoginModal from '@/components/LoginModal'

import Logo from './images/logo.png'

import styles from './Nav.module.scss'

const Nav: FC = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  return (
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
        <div className={styles.right}>
          {!accessToken && (
            <Link className={styles.link} href="?modal=login" replace shallow>
              Login
            </Link>
          )}

          <Link className={styles.button} href={env.storeUrl} target="_blank">
            Lisa de compras
          </Link>
        </div>
      </Container>

      {!accessToken && <LoginModal />}
    </nav>
  )
}

export default Nav
