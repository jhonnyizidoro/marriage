'use client'

import confirmInviteAction from '@/actions/confirmInvite'
import getInvitesData from '@/api/getInvitesData'
import { useAction } from 'next-safe-action/hooks'
import { usePathname, useSearchParams } from 'next/navigation'
import { type FC, useCallback, useEffect, useState } from 'react'

import Checkbox from '@/components/Checkbox'
import Modal from '@/components/Modal'
import Select, { SelectOption } from '@/components/Select'
import { toastify } from '@/components/Toast'

import styles from './ConfirmModal.module.scss'

type Props = {
  confirmed: boolean
  invites: Awaited<ReturnType<typeof getInvitesData>>
}

const ConfirmModal: FC<Props> = ({ confirmed, invites }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [people, setPeople] = useState<SelectOption[]>([])

  const action = useAction(confirmInviteAction, {
    onError: ({ error }) => toastify({ message: error.serverError }),
  })

  const removePerson = useCallback((op: SelectOption) => {
    setPeople((state) => state.filter((auxOp) => auxOp.value !== op.value))
  }, [])

  useEffect(() => {
    if (!action.hasErrored) {
      return
    }

    toastify({
      message: 'Erro ao confirmar. Se erro persistir, entre em contato',
    })
  }, [action.hasErrored])

  useEffect(() => {
    setPeople([])
  }, [searchParams])

  return (
    <Modal
      params={confirmed ? ['nav-confirm'] : ['confirm', 'nav-confirm']}
      title="Confirme sua presença"
      cancelLabel="Deixar para depois"
      okLabel="Confirmar"
      isLoading={action.status === 'executing'}
      onOk={() =>
        action.execute({
          id: people.map((op) => op.value),
          redirectUrl: pathname,
          isConfirmed: false,
        })
      }
    >
      <p className={styles.text}>
        É com muita alegria que recebemos você no nosso grande dia
      </p>
      <div className={styles.inputWrapper}>
        <Select
          placeholder="Pesquise o nome do convidado"
          label="Nome do convidado"
          onChange={setPeople}
          value={people}
          options={invites.map((i) => ({ label: i.name, value: i.id }))}
        />
      </div>
      {!people.length && (
        <strong className={styles.title}>
          Adicione os nomes que deseja confirmar
        </strong>
      )}

      {people.map((p, i) => (
        <Checkbox
          label={p.label}
          key={i}
          checked
          onChange={() => removePerson(p)}
        />
      ))}
    </Modal>
  )
}

export default ConfirmModal
