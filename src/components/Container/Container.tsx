import cn from '@/utils/cn'
import type { FC, PropsWithChildren } from 'react'

import styles from './Container.module.scss'

type Props = PropsWithChildren<{
  className?: string
}>

const Container: FC<Props> = ({ children, className }) => (
  <div className={cn(className, styles.container)}>{children}</div>
)

export default Container
