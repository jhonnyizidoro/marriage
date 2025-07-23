'use client'

import createOrUpdateInviteAction from '@/actions/createOrUpdateInvite'
import getInvitesData from '@/api/getInvitesData'
import { useAction } from 'next-safe-action/hooks'
import { type FC, useCallback, useEffect, useState } from 'react'

import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { toastify } from '@/components/Toast'

import CloseIcon from '@/assets/icons/CloseIcon'

import styles from './InviteModal.module.scss'

type Props = {
  data?: Awaited<ReturnType<typeof getInvitesData>>[number]
}

const InviteModal: FC<Props> = ({ data }) => {
  const [name, setName] = useState('')
  const [person, setPerson] = useState('')
  const [autoConfirm, setAutoConfirm] = useState(false)
  const [people, setPeople] = useState<{ name: string; id?: string }[]>([])
  const action = useAction(createOrUpdateInviteAction)

  const addPerson = useCallback(() => {
    setPeople((state) => [...state, { name: person }])
    setPerson('')
  }, [person])

  const removePerson = useCallback((person: string) => {
    setPeople((state) => state.filter((p) => p.name !== person))
  }, [])

  useEffect(() => {
    const errorMessage = action.result.serverError

    if (errorMessage) {
      toastify({ message: errorMessage })
    }
  }, [action.result])

  useEffect(() => {
    setName(data?.name || '')
    setPeople(data?.people || [])
    setAutoConfirm(!!data?.people.some((p) => p.confirmed))
  }, [data])

  return (
    <Modal
      param="invite"
      title="Adicionar convite"
      cancelLabel="Canelar"
      okLabel={data ? 'Editar convite' : 'Criar convite'}
      onOk={() => action.execute({ name, people, id: data?.id, autoConfirm })}
    >
      <Input
        label="Nome no convite"
        onChange={setName}
        value={name}
        error={action.result.validationErrors?.name?._errors?.[0]}
      />
      <div className={styles.buttonWrapper}>
        <Input
          label="Adicionar convidado"
          onChange={setPerson}
          value={person}
          error={
            action.result.validationErrors?.people &&
            '_errors' in action.result.validationErrors?.people
              ? action.result.validationErrors?.people._errors?.[0]
              : ''
          }
        />
        <button type="button" onClick={addPerson} className={styles.button}>
          Adicionar
        </button>
      </div>
      <div className={styles.list}>
        {people.map((p, i) => (
          <button
            type="button"
            className={styles.removeButton}
            key={i}
            onClick={() => removePerson(p.name)}
          >
            {p.name}
            <CloseIcon width={7} />
          </button>
        ))}
      </div>
      <Checkbox
        label="Confirmar automaticamente"
        onChange={setAutoConfirm}
        checked={autoConfirm}
      />
    </Modal>
  )
}

export default InviteModal
