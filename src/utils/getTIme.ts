const getTime = (date: Date) =>
  date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })

export default getTime
