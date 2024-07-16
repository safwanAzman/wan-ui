import * as React from 'react'
import '../index.css'
import { Button as ShadcnButton } from '../ui/button'
import { cn } from '../lib/utils'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, ...restProps } = props
  return (
    <ShadcnButton className={cn(className)} {...restProps}>
      {children}
    </ShadcnButton>
  )
}

export default Button
