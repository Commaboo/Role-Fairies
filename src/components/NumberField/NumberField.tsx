import type { ChangeEvent } from 'react'
import './NumberField.css'

type NumberFieldProps = {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}

function clamp(value: number, min = -Infinity, max = Infinity): number {
  return Math.min(Math.max(value, min), max)
}

function NumberField({ label, value, onChange, min, max }: NumberFieldProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const next = Math.trunc(Number(event.target.value))
    onChange(clamp(next, min, max))
  }

  return (
    <label className="number-field">
      <span className="number-field__label">{label}</span>
      <input
        className="number-field__input"
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
      />
    </label>
  )
}

export default NumberField
