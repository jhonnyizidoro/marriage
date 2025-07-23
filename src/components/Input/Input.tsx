import { type FC, type InputHTMLAttributes, useId } from 'react'

import styles from './Input.module.scss'

type Props = {
  onChange: (value: string) => void
  label: string
  error?: string
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  'autoComplete' | 'type' | 'inputMode' | 'placeholder' | 'value'
>

const Input: FC<Props> = ({ onChange, error, label, ...inputProps }) => {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        className={styles.input}
        id={id}
        onChange={(e) => onChange(e.target.value)}
        {...inputProps}
      />
      <small className={styles.error}>{error}</small>
    </div>
  )
}

export default Input
