import React from 'react'
import TextInput from '../text-input'
import { Label } from 'reactstrap'

export default function TextInputWithLabel({
  value,
  onChange,
  name,
  placeholder,
  type,
  label,
  className
}) {
  return (
    <>
      <Label>{label}</Label>
      <TextInput
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        type={type}
        label={label}
        className={className}
      />
    </>
  )
}
