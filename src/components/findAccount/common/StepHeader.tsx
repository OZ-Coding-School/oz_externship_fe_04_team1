import type { LucideIcon } from 'lucide-react'

type StepHeaderProps = {
  icon: LucideIcon
  title: string
  description: string
  bgColorClass?: string
  iconColorClass?: string
}

function StepHeader({
  icon: Icon,
  title,
  description,
  bgColorClass = 'bg-primary-100',
  iconColorClass = 'text-primary-600',
}: StepHeaderProps) {
  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <div
        className={`${bgColorClass} mb-3 flex size-15 items-center justify-center rounded-full`}
      >
        <Icon className={iconColorClass} size={24} />
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="pb-6 text-center text-sm text-gray-600">{description}</p>
    </div>
  )
}
export default StepHeader
