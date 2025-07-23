'use client'

import logoutAction from '@/actions/logout'
import { useAction } from 'next-safe-action/hooks'
import { type FC, PropsWithChildren, useEffect } from 'react'

import { toastify } from '@/components/Toast'

type Props = PropsWithChildren<{
  className?: string
}>

const NavLogout: FC<Props> = ({ className, children }) => {
  const action = useAction(logoutAction)

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
      onClick={() => action.execute()}
    >
      {children}
    </button>
  )
}

export default NavLogout
