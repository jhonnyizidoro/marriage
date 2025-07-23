'use client'

import generateInviteAction from '@/actions/generateInvite'
import { useAction } from 'next-safe-action/hooks'
import { type FC, PropsWithChildren, useEffect } from 'react'

import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
  ids: string[]
}>

const InviteGenerate: FC<Props> = ({ className, children, ids }) => {
  const action = useAction(generateInviteAction)

  useEffect(() => {
    const errorMessage = action.result.serverError

    if (errorMessage) {
      toastify({ message: errorMessage })
    } else {
      action.result.data?.forEach(({ base64, name }) => {
        const [prefix, data] = base64.split(',')
        const mime = prefix.match(/:(.*?);/)?.[1] ?? 'image/jpeg'
        const blob = new Blob(
          [Uint8Array.from(atob(data), (c) => c.charCodeAt(0))],
          { type: mime }
        )
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `convite-${name}.jpg`
        a.click()
        URL.revokeObjectURL(url)
      })
    }
  }, [action.result])

  return (
    <button
      className={className}
      type="button"
      onClick={() => action.execute({ ids })}
    >
      {children}
    </button>
  )
}

export default InviteGenerate
