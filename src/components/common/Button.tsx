import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all rounded-md font-medium cursor-pointer text-center  disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        primary:
          'bg-primary-500 text-basic-white hover:bg-primary-600 active:bg-primary-700 ',
        secondary:
          'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 active:text-basic-white',
        outline:
          'bg-basic-white border border-gray-300 text-gray-900 hover:bg-gray-50 active:bg-gray-100 active:border-gray-400',
        ghost:
          'bg-transparent text-gray-900 hover:bg-gray-100 active:bg-gray-200',
        danger:
          'bg-danger-500 text-basic-white hover:bg-danger-600 active:bg-danger-800 ',
      },
      size: {
        sm: 'px-3 py-2 rounded-md text-sm ',
        md: 'px-4 py-2.5 rounded-lg text-sm',
        lg: 'px-6 py-3 rounded-lg text-base',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

const Button = ({
  className,
  variant,
  size,
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      className={twMerge(buttonVariants({ variant, size }), className)}
      type={type}
      {...props}
    />
  )
}

export default Button
