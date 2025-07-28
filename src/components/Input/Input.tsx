import { type FC, type InputHTMLAttributes, useId } from 'react'

import styles from './Input.module.scss'

type Props = {
  onChange: (value: string) => void
  onEnterPress?: () => void
  label: string
  error?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'autoComplete' | 'type' | 'inputMode' | 'placeholder' | 'value'
>

const Input: FC<Props> = ({
  onChange,
  error,
  label,
  onEnterPress,
  ...inputProps
}) => {
  const id = useId()

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onEnterPress?.()}
        {...inputProps}
      />
      <small className={styles.error}>{error}</small>
    </div>
  )
}

export default Input
