import cn from '@/utils/cn'
import type { FC, PropsWithChildren } from 'react'

import styles from './Container.module.scss'

type Props = PropsWithChildren<{
  className?: string
  size?: 'large' | 'medium' | 'small'
}>

const Container: FC<Props> = ({ children, className, size }) => (
  <div data-size={size || 'large'} className={cn(className, styles.container)}>
    {children}
  </div>
)

export default Container
