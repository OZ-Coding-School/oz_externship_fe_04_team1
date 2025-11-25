import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean
}

const inputVariants = cva(
  'w-full rounded-lg px-4 py-2.5 text-sm font-normal outline-1 placeholder:text-gray-400 transition-all outline-gray-300 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50',
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
