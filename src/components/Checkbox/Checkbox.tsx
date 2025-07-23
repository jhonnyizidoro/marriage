import { type FC, type InputHTMLAttributes, useId } from 'react'

import CheckIcon from '@/assets/icons/CheckIcon'

import styles from './Checkbox.module.scss'

type Props = {
  onChange: (checked: boolean) => void
  label: string
} & Pick<InputHTMLAttributes<HTMLInputElement>, 'checked'>

const Checkbox: FC<Props> = ({ onChange, label, checked }) => {
  const id = useId()

  return (
    <div className={styles.wrapper}>
      <label htmlFor={id} className={styles.label} data-checked={!!checked}>
        {label}
        {!!checked && <CheckIcon width={13} className={styles.icon} />}
      </label>
      <input
        className={styles.input}
        id={id}
        type="checkbox"
        onChange={(e) => onChange(e.target.checked)}
        checked={checked}
      />
    </div>
  )
}

export default Checkbox
