import { db } from '@/db/db'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'
import SongRequestDelete from '@/components/SongRequestDelete'
import SongRequestForm from '@/components/SongRequestForm'
import TableHeader from '@/components/TableHeader'
import TableRow from '@/components/TableRow'

import styles from './page.module.scss'

export const getData = () => {
  return db.selectFrom('songRequests').selectAll().execute()
}

const SongRequestsPage: FC = async () => {
  const data = await getData()

  return (
    <Container size="small" className={styles.wrapper}>
      <SongRequestForm />
      <TableHeader>Pedidos</TableHeader>
      {data.map((i) => (
        <TableRow key={i.id} className={styles.row}>
          <Image src={i.thumbnail} alt="" width={94} height={70} />
          <div>
            <Link className={styles.title} href={i.link} target="_blank">
              {i.name.toLowerCase()}
            </Link>
            <SongRequestDelete id={i.id} className={styles.link}>
              Excluir
            </SongRequestDelete>
          </div>
        </TableRow>
      ))}
    </Container>
  )
}

export default SongRequestsPage
