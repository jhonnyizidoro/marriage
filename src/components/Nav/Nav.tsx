import env from '@/env'
import { cookies } from 'next/headers'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'
import FloatingButton from '@/components/FloatingButton'
import LoginModal from '@/components/LoginModal'
import NavLogout from '@/components/NavLogout'
import NavMobile from '@/components/NavMobile'

import Logo from './images/logo.png'

import styles from './Nav.module.scss'

const Nav: FC = async () => {
  const cookieStore = await cookies()
  const accessToken = cookieStore.get('accessToken')

  return (
    <>
      {!accessToken && <LoginModal />}
      <FloatingButton />
      <NavMobile>
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

            {accessToken && (
              <div className={styles.dropdownWrapper}>
                <span className={styles.dropdownLabel} role="link">
                  Ações
                </span>
                <div className={styles.dropdown}>
                  <Link className={styles.dropdownLink} href="/convites">
                    Convites
                  </Link>
                  <Link
                    className={styles.dropdownLink}
                    href="/pedidos-de-musica"
                  >
                    Pedidos de música
                  </Link>
                  <NavLogout className={styles.dropdownLink}>Logout</NavLogout>
                </div>
              </div>
            )}

            <Link className={styles.button} href={env.storeUrl} target="_blank">
              Lista de presentes
            </Link>
          </div>
        </Container>
      </NavMobile>
    </>
  )
}

export default Nav
