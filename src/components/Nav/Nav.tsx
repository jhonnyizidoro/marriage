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
            <Link className={styles.link} href="/em-construcao">
              Vestimentas
            </Link>
            <Link className={styles.link} href="/em-construcao">
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
              <div className={styles.dropdownWrapper}>
                <span className={styles.dropdownLabel} role="link">
                  Menu
                </span>
                <div className={styles.dropdown}>
                  <Link
                    className={styles.dropdownLink}
                    href="?modal=nav-confirm"
                  >
                    Confirmar presença
                  </Link>
                  <Link className={styles.dropdownLink} href="?modal=login">
                    Login
                  </Link>
                </div>
              </div>
            )}

            {accessToken && (
              <div className={styles.dropdownWrapper}>
                <span className={styles.dropdownLabel} role="link">
                  Menu
                </span>
                <div className={styles.dropdown}>
                  <Link className={styles.dropdownLink} href="/confirmacoes">
                    Confirmações
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
