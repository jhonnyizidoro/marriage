const cn = (...args: (string | boolean | undefined)[]) => {
  const classNames = args.flatMap((maybeClassName) => {
    return typeof maybeClassName === 'string' ? maybeClassName.split(' ') : []
  })

  return Array.from(new Set(classNames)).join(' ')
}

export default cn
