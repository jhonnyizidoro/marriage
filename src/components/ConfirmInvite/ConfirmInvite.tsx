'use client'

import confirmInviteAction from '@/actions/confirmInvite'
import { useAction } from 'next-safe-action/hooks'
import { type FC, PropsWithChildren } from 'react'

import Loader from '@/components/Loader'
import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
  id: string
  isConfirmed: boolean
}>

const ConfirmInvite: FC<Props> = ({ className, children, id, isConfirmed }) => {
  const action = useAction(confirmInviteAction, {
    onError: ({ error }) => toastify({ message: error.serverError }),
  })

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => action.execute({ id, isConfirmed })}
      >
        {children}
      </button>
      {action.status === 'executing' && <Loader />}
    </>
  )
}

export default ConfirmInvite
