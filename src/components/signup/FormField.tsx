import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface FormFieldProps {
  label?: string
  htmlFor?: string
  require?: boolean
  info?: string
  className?: string
  errorMsg?: string
  children: ReactNode
}

function FormField({
  htmlFor,
  label,
  info,
  require,
  className,
  errorMsg,
  children,
}: FormFieldProps) {
  return (
    <div className={cn('flex flex-col gap-5', className)}>
      <label htmlFor={htmlFor}>
        {label}
        {require && <span className="text-danger-500 pl-0.5">*</span>}
        {info && (
          <span className="text-primary-500 pl-3 text-sm font-semibold">
            {info}
          </span>
        )}
      </label>
      <div>
        {children}
        {errorMsg && (
          <p className="text-danger-500 pt-2 pl-1 text-sm">{errorMsg}</p>
        )}
      </div>
    </div>
  )
}

export default FormField
