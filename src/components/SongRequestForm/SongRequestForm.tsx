'use client'

import createSongRequestAction from '@/actions/createSongRequest'
import { useAction } from 'next-safe-action/hooks'
import { type FC, useEffect, useState } from 'react'

import Input from '@/components/Input'
import Loader from '@/components/Loader'
import { toastify } from '@/components/Toast'

import styles from './SongRequestForm.module.scss'

const SongRequestForm: FC = () => {
  const [url, setUrl] = useState('')
  const action = useAction(createSongRequestAction)

  useEffect(() => {
    const errorMessage = action.result.serverError || action.result.data?.error

    if (errorMessage) {
      toastify({ message: errorMessage })
    }
  }, [action.result])

  return (
    <>
      <div className={styles.form}>
        <Input
          label="URL do youtube"
          onChange={setUrl}
          value={url}
          type="url"
          inputMode="url"
          error={action.result.validationErrors?.url?._errors?.[0]}
        />
        <button
          type="button"
          className={styles.button}
          onClick={() => action.executeAsync({ url }).then(() => setUrl(''))}
        >
          Adicionar
        </button>
      </div>
      {action.status === 'executing' && <Loader />}
    </>
  )
}

export default SongRequestForm
