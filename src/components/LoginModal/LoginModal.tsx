'use client'

import loginAction from '@/actions/login'
import { useAction } from 'next-safe-action/hooks'
import { type FC, useEffect, useState } from 'react'

import Input from '@/components/Input'
import Modal from '@/components/Modal'
import { toastify } from '@/components/Toast'

const LoginModal: FC = () => {
  const [password, setPassword] = useState('')
  const action = useAction(loginAction)

  useEffect(() => {
    const errorMessage = action.result.serverError || action.result.data?.error

    if (errorMessage) {
      toastify({ message: errorMessage })
    }
  }, [action.result])

  return (
    <Modal
      param="login"
      title="Faça seu login"
      cancelLabel="Canelar"
      okLabel="Fazer login"
      onOk={() => action.execute({ password })}
    >
      <Input
        label="Senha"
        onChange={setPassword}
        value={password}
        autoComplete="current-password"
        type="password"
        error={action.result.validationErrors?.password?._errors?.[0]}
      />
    </Modal>
  )
}

export default LoginModal
