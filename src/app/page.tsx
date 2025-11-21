import type { FC } from 'react'

import Countdown from '@/components/Countdown'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import LocationAndDate from '@/components/LocationAndDate'
import StoreCTA from '@/components/StoreCTA'

import styles from './page.module.scss'

const HomePage: FC = async () => {
  return (
    <>
      <Hero />
      <Countdown />
      <StoreCTA />
      <LocationAndDate />
      <h3 className={styles.bottomTitle}>
        Aguardamos ansiosamente a sua presença para esse dia especial
      </h3>
      <Gallery />
    </>
  )
}
export default HomePage
