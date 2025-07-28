import getInvitesData from '@/api/getInvitesData'
import Link from 'next/link'
import type { FC } from 'react'

import Container from '@/components/Container'
import InviteDelete from '@/components/InviteDelete'
import InviteGenerate from '@/components/InviteGenerate'
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

const InvitesPage: FC<Props> = async ({ searchParams }) => {
  const id = (await searchParams).id
  const data = await getInvitesData()
  const editing = data.find((i) => i.id === id)
  const people = data.map((d) => d.people).flat()
  const confirmed = people.filter((p) => p.confirmed)
  const ids = data.map((i) => i.id)

  return (
    <Container size="small" className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <div>
            Convites: <strong>{data.length}</strong>
          </div>
          <div>
            Pessoa convidadas: <strong>{people.length}</strong>
          </div>
          <div>
            Pessoas confirmadas: <strong>{confirmed.length}</strong>
          </div>
        </div>
        <div>
          <Link shallow replace className={styles.link} href="?modal=invite">
            Adicionar convite
          </Link>
          <InviteGenerate className={styles.link} ids={ids}>
            Gerar convites
          </InviteGenerate>
        </div>
      </div>

      <TableHeader>Convites</TableHeader>
      {data.map((i) => (
        <TableRow key={i.id} className={styles.row}>
          <div>
            <h3 className={styles.rowTitle}>{i.name}</h3>
            <strong className={styles.rowCount}>
              {i.people.length} pessoa{i.people.length > 1 ? 's' : ''}
            </strong>
            <span className={styles.rowText}>
              {i.people.map((p, i) => (
                <span
                  key={i}
                  className={styles.rowName}
                  data-confirmed={p.confirmed}
                >
                  {p.name.split(' ')[0]}
                </span>
              ))}
            </span>
          </div>
          <div className={styles.rowRight}>
            <InviteGenerate className={styles.rowLink} ids={[i.id]}>
              Gerar convite
            </InviteGenerate>
            <div>
              <Link
                href={`/?modal=confirm&id=${i.id}&force=true`}
                target="_blank"
                className={styles.rowButton}
              >
                Confirmar
              </Link>
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
