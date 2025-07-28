const createActionError = (message: string) =>
  new Error(message, { cause: 'INTERNAL' })

export default createActionError
