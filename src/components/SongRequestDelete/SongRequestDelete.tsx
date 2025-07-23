'use client'

import deleteSongRequestAction from '@/actions/deleteSongRequest'
import { useAction } from 'next-safe-action/hooks'
import { type FC, type PropsWithChildren, useEffect } from 'react'

import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
  id: string
}>

const SongRequestDelete: FC<Props> = ({ children, id, className }) => {
  const action = useAction(deleteSongRequestAction)

  useEffect(() => {
    const errorMessage = action.result.serverError

    if (errorMessage) {
      toastify({ message: errorMessage })
    }
  }, [action.result])

  return (
    <button
      className={className}
      type="button"
      onClick={() => action.execute({ id })}
    >
      {children}
    </button>
  )
}

export default SongRequestDelete
