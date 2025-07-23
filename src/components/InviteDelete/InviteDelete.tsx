'use client'

import deleteInviteAction from '@/actions/deleteInvite'
import { useAction } from 'next-safe-action/hooks'
import { type FC, PropsWithChildren, useEffect } from 'react'

import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
  id: string
}>

const InviteDelete: FC<Props> = ({ className, children, id }) => {
  const action = useAction(deleteInviteAction)

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

export default InviteDelete
