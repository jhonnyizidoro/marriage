import { db } from '@/db/db'
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

export const getData = async (id = '') => {
  if (!id) {
    return
  }

  const [invite, invitedPeople] = await Promise.all([
    db
      .selectFrom('invites')
      .where('id', '=', id)
      .where('confirmedAt', 'is', null)
      .selectAll()
      .executeTakeFirst(),
    db
      .selectFrom('invitedPeople')
      .where('invite', '=', id)
      .selectAll()
      .execute(),
  ])

  if (!invite) {
    return
  }

  return {
    id: invite.id,
    name: invite.name,
    people: invitedPeople.map((p) => ({
      id: p.id,
      name: p.name,
    })),
  }
}

const HomePage: FC<Props> = async ({ searchParams }) => {
  const id = (await searchParams).id
  const data = await getData(id)

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
