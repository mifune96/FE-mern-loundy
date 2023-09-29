import React from 'react'
import { TextInputR } from './text-input'
import { FormGroup, Label } from 'reactstrap'

export const TextInputWithLabelR = ({
  label,
  name,
  rules = {},
  placeholder,
  type,
  disabled,
  className,
  ...rest
}) => {
  return (
    <>
      <Label>{label}</Label>
      <TextInputR
        name={name}
        rules={rules}
        placeholder={placeholder}
        type={type}
        disabled={disabled}
        className={className}
        {...rest}
      />
    </>
  )
}
