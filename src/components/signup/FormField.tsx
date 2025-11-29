import type { ReactNode } from 'react'

interface FromFieldProps {
  label: string
  htmlFor: string
  require?: boolean
  children: ReactNode
}

function FormField({ htmlFor, label, require, children }: FromFieldProps) {
  return (
    <div className="flex flex-col gap-5">
      <label htmlFor={htmlFor}>
        {label}
        {require && <span className="text-danger-500">*</span>}
      </label>
      {children}
    </div>
  )
}

export default FormField
