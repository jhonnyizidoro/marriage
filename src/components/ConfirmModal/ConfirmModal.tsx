'use client'

import addConfirmationsAction from '@/actions/addConfirmations'
import { useAction } from 'next-safe-action/hooks'
import { usePathname, useSearchParams } from 'next/navigation'
import { type FC, useCallback, useEffect, useState } from 'react'

import Checkbox from '@/components/Checkbox'
import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { toastify } from '@/components/Toast'

import PlusIcon from '@/assets/icons/PlusIcon'

import styles from './ConfirmModal.module.scss'

type Props = {
  confirmed: boolean
}

const ConfirmModal: FC<Props> = ({ confirmed }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [person, setPerson] = useState('')
  const [people, setPeople] = useState<string[]>([])
  const action = useAction(addConfirmationsAction, {
    onError: ({ error }) => toastify({ message: error.serverError }),
  })

  const addPerson = useCallback((person: string) => {
    setPeople((state) => [...state, person])
    setPerson('')
  }, [])

  const removePerson = useCallback((person: string) => {
    setPeople((state) => state.filter((auxPerson) => person !== auxPerson))
    setPerson('')
  }, [])

  useEffect(() => {
    if (!action.hasErrored) {
      return
    }

    toastify({
      message:
        'Erro ao inserir. Adicione pelo menos um nome para ser confirmado clicando no botão ao lado do campo de texto (+)',
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
      onOk={() => action.execute({ people, redirectUrl: pathname })}
      isLoading={action.status === 'executing'}
    >
      <p className={styles.text}>
        É com muita alegria que recebemos você no nosso grande dia
      </p>
      <div className={styles.inputWrapper}>
        <Input
          label="Nome do convidado"
          onChange={setPerson}
          value={person}
          onEnterPress={() => addPerson(person)}
        />
        <button className={styles.button} onClick={() => addPerson(person)}>
          <PlusIcon width={20} />
        </button>
      </div>
      {!people.length && (
        <strong className={styles.title}>
          Adicione os nomes que deseja confirmar
        </strong>
      )}

      {people.map((p, i) => (
        <Checkbox label={p} key={i} checked onChange={() => removePerson(p)} />
      ))}
    </Modal>
  )
}

export default ConfirmModal
