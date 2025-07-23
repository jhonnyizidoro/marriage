import Link from 'next/link'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { type FC, type PropsWithChildren, useCallback, useEffect } from 'react'

import CloseIcon from '@/assets/icons/CloseIcon'

import styles from './Modal.module.scss'

type Props = PropsWithChildren<{
  title: string
  cancelLabel: string
  okLabel: string
  onOk: () => void
  param: string
}>

const Modal: FC<Props> = ({
  param,
  children,
  cancelLabel,
  okLabel,
  onOk,
  title,
}) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const isOpen = searchParams.get('modal') === param

  const close = useCallback(() => {
    replace(pathname)
  }, [pathname, replace])

  const handleKeyEvents = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        replace(pathname)
      }
    },
    [pathname, replace]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyEvents)

    return () => {
      document.removeEventListener('keydown', handleKeyEvents)
    }
  }, [handleKeyEvents])

  if (!isOpen) {
    return
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <Link
          href={pathname}
          shallow
          replace
          aria-label="Fechar janela"
          className={styles.closeLink}
          onClick={close}
        >
          <CloseIcon width={20} />
        </Link>
        <strong className={styles.title}>{title}</strong>
        <div>{children}</div>
        <div className={styles.footer}>
          <Link
            href={pathname}
            shallow
            replace
            className={styles.cancelLink}
            onClick={close}
          >
            {cancelLabel}
          </Link>
          <button className={styles.okButton} type="button" onClick={onOk}>
            {okLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
