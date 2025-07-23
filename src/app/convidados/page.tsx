import { db } from '@/db/db'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'
import InviteDelete from '@/components/InviteDelete'
import InviteModal from '@/components/InviteModal'
import TableHeader from '@/components/TableHeader'
import TableRow from '@/components/TableRow'

import styles from './page.module.scss'

type Props = {
  searchParams: Promise<{
    id?: string
    modal?: string
  }>
}

export const getData = async () => {
  const [invites, invitedPeople] = await Promise.all([
    db.selectFrom('invites').selectAll().execute(),
    db.selectFrom('invitedPeople').selectAll().execute(),
  ])

  return invites.map((i) => ({
    id: i.id,
    name: i.name,
    people: invitedPeople
      .filter((p) => p.invite === i.id)
      .map((p) => ({
        id: p.id,
        name: p.name,
      })),
  }))
}

const InvitesPage: FC<Props> = async ({ searchParams }) => {
  const id = (await searchParams).id
  const data = await getData()
  const editing = data.find((i) => i.id === id)

  return (
    <Container size="small" className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <div>
            Convites: <strong>19</strong>
          </div>
          <div>
            Pessoa convidadas: <strong>19</strong>
          </div>
          <div>
            Pessoas confirmadas: <strong>19</strong>
          </div>
        </div>
        <div>
          <Link shallow replace className={styles.link} href="?modal=invite">
            Adicionar convite
          </Link>
          <Link className={styles.link} href="#">
            Gerar convites
          </Link>
        </div>
      </div>

      <TableHeader>Convidados</TableHeader>
      {data.map((i) => (
        <TableRow key={i.id} className={styles.row}>
          <div>
            <h3 className={styles.rowName}>{i.name}</h3>
            <strong className={styles.rowCount}>
              {i.people.length} pessoa{i.people.length > 1 ? 's' : ''}
            </strong>
            <span className={styles.rowText}>
              {i.people.map((p) => p.name.split(' ')[0]).join(', ')}
            </span>
          </div>
          <div className={styles.rowRight}>
            <Link className={styles.rowLink} href="#">
              Gerar convite
            </Link>
            <div>
              <Link
                href={`?modal=invite&id=${i.id}`}
                shallow
                replace
                className={styles.rowButton}
              >
                Editar
              </Link>
              <InviteDelete className={styles.rowButton} id={i.id}>
                Excluir
              </InviteDelete>
            </div>
          </div>
        </TableRow>
      ))}

      <InviteModal data={editing} />
    </Container>
  )
}

export default InvitesPage
