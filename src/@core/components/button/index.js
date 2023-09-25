import React from 'react'
import { Button } from 'reactstrap'

const LButton = ({
  children,
  onClick,
  color = 'primary',
  loading,
  disabled,
  className,
  size,
  style,
  type
}) => {
  return (
    <Button
      className={className}
      onClick={onClick}
      color={color}
      disabled={disabled}
      size={size}
      style={style}
      type={type}
    >
      {loading ? 'Loading...' : children}
    </Button>
  )
}

export default LButton
