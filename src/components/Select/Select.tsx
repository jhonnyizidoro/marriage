import { useClickAway } from '@/hooks/click-away'
import { useCallback, useId, useMemo, useRef, useState } from 'react'
import type { FC, InputHTMLAttributes } from 'react'

import inputStyles from '../Input/Input.module.scss'
import styles from './Select.module.scss'

export type SelectOption = {
  label: string
  value: string
}

type Props = {
  label: string
  error?: string
  value: SelectOption[]
  options: SelectOption[]
  onChange: (value: SelectOption[]) => void
} & Pick<InputHTMLAttributes<HTMLSelectElement>, 'inputMode' | 'placeholder'>

const Select: FC<Props> = ({
  onChange,
  error,
  label,
  options,
  value,
  ...inputProps
}) => {
  const [search, setSearch] = useState('')
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLInputElement>(null)
  const id = useId()

  useClickAway(ref, () => {
    setVisible(false)
  })

  const filteredOptions = useMemo(() => {
    return options.filter((op) => {
      const formattedSearch = search.replaceAll(' ', '').toLowerCase()
      const formattedLabel = op.label.replaceAll(' ', '').toLowerCase()
      const alreadySelected = value.some((auxOp) => auxOp.value === op.value)
      return formattedLabel.includes(formattedSearch) && !alreadySelected
    })
  }, [options, search, value])

  const handleChange = useCallback(
    (op: SelectOption) => {
      setSearch('')
      onChange([...value, op])
    },
    [onChange, value]
  )

  return (
    <div className={inputStyles.wrapper} ref={ref}>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        value={search}
        className={inputStyles.input}
        onFocus={() => setVisible(true)}
        onChange={(e) => setSearch(e.target.value)}
        {...inputProps}
      />
      <small className={inputStyles.error}>{error}</small>
      {visible && search.length >= 3 && (
        <div className={styles.list}>
          {!filteredOptions.length && (
            <button className={styles.listItem}>Nome não encontrado</button>
          )}

          {!!filteredOptions.length &&
            filteredOptions.map((op) => (
              <button
                className={styles.listItem}
                key={op.value}
                onClick={() => handleChange(op)}
              >
                {op.label}
              </button>
            ))}
        </div>
      )}
    </div>
  )
}

export default Select
