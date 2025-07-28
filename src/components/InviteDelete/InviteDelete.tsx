'use client'

import deleteInviteAction from '@/actions/deleteInvite'
import { useAction } from 'next-safe-action/hooks'
import { type FC, PropsWithChildren } from 'react'

import Loader from '@/components/Loader'
import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
  id: string
}>

const InviteDelete: FC<Props> = ({ className, children, id }) => {
  const action = useAction(deleteInviteAction, {
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

export default InviteDelete
