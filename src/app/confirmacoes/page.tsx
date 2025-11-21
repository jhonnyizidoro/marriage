import getConfirmationsData from '@/api/getConfirmationsData'
import Link from 'next/link'
import { FC } from 'react'

import ConfirmationDelete from '@/components/ConfirmationDelete'
import Container from '@/components/Container'
import InviteGenerate from '@/components/InviteGenerate'
import TableHeader from '@/components/TableHeader'
import TableRow from '@/components/TableRow'

import styles from './page.module.scss'

const ConfirmationsPage: FC = async () => {
  const data = await getConfirmationsData()

  return (
    <Container size="small" className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          Confirmações: <strong>{data.length}</strong>
        </div>
        <div>
          <InviteGenerate className={styles.link}>Gerar convite</InviteGenerate>
          <Link className={styles.link} href="?modal=nav-confirm">
            Confirmar presença
          </Link>
        </div>
      </div>

      <TableHeader>Confirmações</TableHeader>
      {data.map((c) => (
        <TableRow key={c.id} className={styles.row}>
          <div>
            <h3 className={styles.rowTitle}>{c.name}</h3>
            <span>
              Data:{' '}
              <strong>
                {new Intl.DateTimeFormat('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                }).format(c.createdAt)}
              </strong>
            </span>
          </div>
          <ConfirmationDelete className={styles.rowButton} id={c.id}>
            Excluir
          </ConfirmationDelete>
        </TableRow>
      ))}
    </Container>
  )
}

export default ConfirmationsPage
