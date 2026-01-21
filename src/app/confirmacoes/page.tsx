import getInvitesData from '@/api/getInvitesData'
import Link from 'next/link'
import { FC } from 'react'

import ConfirmInvite from '@/components/ConfirmInvite'
import Container from '@/components/Container'
import CreateInvite from '@/components/CreateInvite'
import DeleteInvite from '@/components/DeleteInvite'
import InviteGenerate from '@/components/InviteGenerate'
import TableHeader from '@/components/TableHeader'
import TableRow from '@/components/TableRow'

import styles from './page.module.scss'

const InvitesPage: FC = async () => {
  const data = await getInvitesData()

  return (
    <Container size="small" className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <div>
            Convidados: <strong>{data.length}</strong>
          </div>
          <div>
            Confirmações:{' '}
            <strong>{data.filter((i) => !!i.confirmedAt).length}</strong>
          </div>
        </div>
        <div>
          <InviteGenerate className={styles.link}>Gerar convite</InviteGenerate>
          <Link className={styles.link} href="?modal=nav-confirm">
            Confirmar presença
          </Link>
        </div>
      </div>

      <CreateInvite />

      <TableHeader>Confirmações</TableHeader>
      {data.map((i) => (
        <TableRow key={i.id} className={styles.row}>
          <div>
            <h3 className={styles.rowTitle}>{i.name}</h3>
            <span>
              {i.confirmedAt && (
                <>
                  Data:{' '}
                  <strong>
                    {new Intl.DateTimeFormat('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    }).format(i.createdAt)}
                  </strong>
                </>
              )}

              {!i.confirmedAt && <strong>Não confirmado</strong>}
            </span>
          </div>
          <div>
            <DeleteInvite className={styles.rowButton} id={i.id}>
              Excluir
            </DeleteInvite>
            <ConfirmInvite
              className={styles.rowButton}
              id={i.id}
              isConfirmed={!!i.confirmedAt}
            >
              {i.confirmedAt ? 'Desconfirmar' : 'Confirmar'}
            </ConfirmInvite>
          </div>
        </TableRow>
      ))}
    </Container>
  )
}

export default InvitesPage
