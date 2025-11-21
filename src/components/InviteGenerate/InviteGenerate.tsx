'use client'

import generateInviteAction from '@/actions/generateInvite'
import { useAction } from 'next-safe-action/hooks'
import { type FC, PropsWithChildren } from 'react'

import Loader from '@/components/Loader'
import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
}>

const InviteGenerate: FC<Props> = ({ className, children }) => {
  const action = useAction(generateInviteAction, {
    onError: ({ error }) => toastify({ message: error.serverError }),
    onSuccess: async ({ data }) => {
      const res = await fetch(data)
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'convite.jpg'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    },
  })

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => action.execute()}
      >
        {children}
      </button>
      {action.status === 'executing' && <Loader />}
    </>
  )
}

export default InviteGenerate
