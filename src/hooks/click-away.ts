import { RefObject, useCallback, useEffect } from 'react'

export const useClickAway = (
  ref: RefObject<HTMLElement | undefined | null>,
  cb: () => void
) => {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (
        ref.current !== event.target &&
        !ref.current?.contains(event.target as Node)
      ) {
        cb()
      }
    },
    [cb, ref]
  )

  useEffect(() => {
    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])
}
