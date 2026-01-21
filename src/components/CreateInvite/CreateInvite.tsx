'use client'

import createInviteAction from '@/actions/createInvite'
import { useAction } from 'next-safe-action/hooks'
import { useSearchParams } from 'next/navigation'
import { type FC, useEffect, useState } from 'react'

import Input from '@/components/Input'
import Loader from '@/components/Loader'
import { toastify } from '@/components/Toast'

import PlusIcon from '@/assets/icons/PlusIcon'

import styles from './CreateInvite.module.scss'

const CreateInvite: FC = () => {
  const [name, setName] = useState('')
  const searchParams = useSearchParams()
  const action = useAction(createInviteAction, {
    onError: ({ error }) => toastify({ message: error.serverError }),
  })

  useEffect(() => {
    setName('')
  }, [searchParams])

  return (
    <div className={styles.wrapper}>
      <Input
        placeholder="Nome"
        label="Adicionar convidado"
        value={name}
        onChange={setName}
        error={action.result.validationErrors?.name?._errors?.[0]}
      />
      <button
        className={styles.button}
        type="button"
        onClick={() => action.execute({ name })}
      >
        <PlusIcon width={20} />
      </button>
      {action.status === 'executing' && <Loader />}
    </div>
  )
}

export default CreateInvite
