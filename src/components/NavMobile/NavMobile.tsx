'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { type FC, type PropsWithChildren, useEffect, useState } from 'react'

import Container from '@/components/Container'

import Logo from './images/logo.png'

import styles from './NavMobile.module.scss'

const NavMobile: FC<PropsWithChildren> = ({ children }) => {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()

  useEffect(() => {
    setOpen(false)
  }, [searchParams])

  return (
    <>
      <nav className={styles.wrapper}>
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
          <button
            className={styles.hamburger}
            type="button"
            onClick={() => setOpen(!open)}
          >
            Menu
            <div className={styles.hamburgerMenu} data-open={open} />
          </button>
        </Container>
        <div className={styles.content} data-open={open}>
          {children}
        </div>
      </nav>
    </>
  )
}

export default NavMobile
