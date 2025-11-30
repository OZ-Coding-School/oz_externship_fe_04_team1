import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

const inputVariants = cva(
  'w-full rounded-lg px-4 py-2.5 text-sm font-normal border-2 placeholder:text-gray-400 transition-all border-gray-300 disabled:cursor-not-allowed focus:outline-none disabled:bg-gray-50 disabled:opacity-50',
  {
    variants: {
      variant: {
        focus: 'focus:border-primary-500',
        error: 'border-danger-100',
      },
    },
  }
)

function Input({
  type = 'text',
  className,
  disabled,
  error = false,
  ...props
}: InputProps) {
  const variant = error ? 'error' : 'focus'

  return (
    <input
      type={type}
      disabled={disabled}
      className={twMerge(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export default Input
