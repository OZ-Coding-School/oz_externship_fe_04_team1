import type { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface FromFieldProps {
  label?: string
  htmlFor?: string
  require?: boolean
  info?: string
  className?: string
  children: ReactNode
}

function FormField({
  htmlFor,
  label,
  info,
  require,
  className,
  children,
}: FromFieldProps) {
  return (
    <div className={twMerge(`flex flex-col gap-5 ${className}`)}>
      <label htmlFor={htmlFor}>
        {label}
        {require && <span className="text-danger-500 pl-0.5">*</span>}
        {info && (
          <span className="text-primary-500 pl-3 text-sm font-semibold">
            {info}
          </span>
        )}
      </label>
      {children}
    </div>
  )
}

export default FormField
