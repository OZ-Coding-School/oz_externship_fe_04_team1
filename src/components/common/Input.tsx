import { cva } from 'class-variance-authority'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

const inputVariants = cva(
  'w-full rounded-lg px-4 py-2.5 text-sm font-normal outline-2 placeholder:text-gray-400 transition-all outline-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
  {
    variants: {
      variant: {
        focus: 'focus:outline-primary-500 focus:outline-2',
        error: 'outline-danger-100',
      },
    },
  }
)

function Input({
  type = 'text',
  className,
  disabled,
  error = false,
  value,
  ...props
}: InputProps) {
  const variant = error ? 'error' : 'focus'
  // value값 받아와서 수정할 수 있게 추가
  const [defaultValue, setDefaultValue] = useState(value)
  return (
    <input
      type={type}
      disabled={disabled}
      className={twMerge(inputVariants({ variant }), className)}
      value={defaultValue}
      onChange={(e) => setDefaultValue(e.target.value)}
      {...props}
    />
  )
}

export default Input
