import { createSafeActionClient } from 'next-safe-action'

const createAction = createSafeActionClient({
  handleServerError: (error) =>
    error.cause === 'INTERNAL'
      ? error.message
      : 'Ocorreu um erro, se o erro persistir entre em contato conosco por WhatsApp',
})

export default createAction
