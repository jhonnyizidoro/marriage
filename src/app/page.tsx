import getHomeData from '@/api/getHomeData'
import type { FC } from 'react'

import ConfirmModal from '@/components/ConfirmModal'
import Countdown from '@/components/Countdown'
import Gallery from '@/components/Gallery'
import Hero from '@/components/Hero'
import LocationAndDate from '@/components/LocationAndDate'
import StoreCTA from '@/components/StoreCTA'

import styles from './page.module.scss'

type Props = {
  searchParams: Promise<{
    id?: string
    modal?: string
  }>
}

const HomePage: FC<Props> = async ({ searchParams }) => {
  const id = (await searchParams).id
  const data = await getHomeData(id)

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
      {data && <ConfirmModal data={data} />}
    </>
  )
}

export default HomePage
