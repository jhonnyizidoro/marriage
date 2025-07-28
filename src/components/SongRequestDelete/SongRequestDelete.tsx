'use client'

import deleteSongRequestAction from '@/actions/deleteSongRequest'
import { useAction } from 'next-safe-action/hooks'
import { type FC, type PropsWithChildren } from 'react'

import Loader from '@/components/Loader'
import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
  id: string
}>

const SongRequestDelete: FC<Props> = ({ children, id, className }) => {
  const action = useAction(deleteSongRequestAction, {
    onError: ({ error }) => toastify({ message: error.serverError }),
  })

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => action.execute({ id })}
      >
        {children}
      </button>
      {action.status === 'executing' && <Loader />}
    </>
  )
}

export default SongRequestDelete
