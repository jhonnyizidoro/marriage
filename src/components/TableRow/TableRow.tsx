import cn from '@/utils/cn'
import type { FC, PropsWithChildren } from 'react'

import styles from './TableRow.module.scss'

type Props = PropsWithChildren<{
  className?: string
}>

const TableRow: FC<Props> = ({ children, className }) => (
  <div className={cn(className, styles.row)}>{children}</div>
)

export default TableRow
