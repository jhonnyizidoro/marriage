'use client'

import generateInviteAction from '@/actions/generateInvite'
import { useAction } from 'next-safe-action/hooks'
import { type FC, PropsWithChildren } from 'react'

import Loader from '@/components/Loader'
import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
  ids: string[]
}>

const InviteGenerate: FC<Props> = ({ className, children, ids }) => {
  const action = useAction(generateInviteAction, {
    onError: ({ error }) => toastify({ message: error.serverError }),
    onSuccess: ({ data }) => {
      const bytes = atob(data)
      const blob = new Blob([Uint8Array.from(bytes, (c) => c.charCodeAt(0))])
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'convites.zip'
      a.click()
      URL.revokeObjectURL(url)
    },
  })

  return (
    <>
      <button
        className={className}
        type="button"
        onClick={() => action.execute({ ids })}
      >
        {children}
      </button>
      {action.status === 'executing' && <Loader />}
    </>
  )
}

export default InviteGenerate
