'use client'

import confirmInviteAction from '@/actions/confirmInvite'
import getHomeData from '@/api/getHomeData'
import { useAction } from 'next-safe-action/hooks'
import { type FC, useCallback, useEffect, useState } from 'react'

import Checkbox from '@/components/Checkbox'
import Modal from '@/components/Modal'
import { toastify } from '@/components/Toast'

import styles from './ConfirmModal.module.scss'

type Props = {
  data: NonNullable<Awaited<ReturnType<typeof getHomeData>>>
}

const ConfirmModal: FC<Props> = ({ data }) => {
  const [confirmed, setConfirmed] = useState<string[]>([])
  const action = useAction(confirmInviteAction)

  const toggleConfirmation = useCallback((id: string) => {
    setConfirmed((state) =>
      state.includes(id)
        ? state.filter((auxId) => id !== auxId)
        : [...state, id]
    )
  }, [])

  useEffect(() => {
    const errorMessage =
      action.result.serverError ||
      (action.result.validationErrors?.people &&
      '_errors' in action.result.validationErrors?.people
        ? action.result.validationErrors?.people._errors?.[0]
        : '')

    if (errorMessage) {
      toastify({ message: errorMessage })
    }
  }, [action.result])

  useEffect(() => {
    setConfirmed(data.people.map((p) => p.id))
  }, [data])

  return (
    <Modal
      param="confirm"
      title="Confirme sua presença"
      cancelLabel="Deixar para depois"
      okLabel={data ? 'Editar convite' : 'Criar convite'}
      onOk={() => action.execute({ people: confirmed, id: data?.id })}
      isLoading={action.status === 'executing'}
    >
      <p className={styles.text}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum quas,
        commodi alias dicta at tempora saepe sed, obcaecati inventore molestiae,
        eos quia rem veritatis. Rem ipsam, natus aut dignissimos eos ea,
        aspernatur exercitationem sed vel ex eius dolorem pariatur.
      </p>
      <strong className={styles.title}>
        Deseja confirmar a presença de todos os convidados?
      </strong>
      {data.people.map((p, i) => (
        <Checkbox
          label={p.name}
          key={i}
          checked={confirmed.includes(p.id)}
          onChange={() => toggleConfirmation(p.id)}
        />
      ))}
    </Modal>
  )
}

export default ConfirmModal
