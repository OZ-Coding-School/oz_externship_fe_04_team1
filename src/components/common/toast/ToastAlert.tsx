import { AlertCircle, CheckCircle2, XCircle, XIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

type ToastType = 'success' | 'warning' | 'error'
// 이거는 컴포넌트용 <ToastAlert type="success" title="제목" message="메시지" /> 이렇게 사용 import 받아올때 default가 아니므로
// import { ToastAlert } from '@/components/common/toast/ToastAlert' 이렇게 받아오기
interface ToastAlertProps {
  type: ToastType
  title: string
  message: string
  closeToast?: () => void
}

const toastConfig = {
  success: {
    icon: CheckCircle2,
    containerClass: 'bg-success-100 border-success-500',
    iconClass: 'text-success-500',
    titleClass: 'text-success-800',
    messageClass: 'text-success-600',
    buttonClass: 'text-success-500 hover:text-success-600',
  },
  warning: {
    icon: AlertCircle,
    containerClass: 'bg-primary-50 border-primary-200',
    iconClass: 'text-primary-400',
    titleClass: 'text-primary-800',
    messageClass: 'text-primary-600',
    buttonClass: 'text-primary-400 hover:text-primary-600',
  },
  error: {
    icon: XCircle,
    containerClass: 'bg-danger-100 border-danger-500',
    iconClass: 'text-danger-500',
    titleClass: 'text-danger-800',
    messageClass: 'text-danger-600',
    buttonClass: 'text-danger-500 hover:text-danger-600',
  },
}

export const ToastAlert = ({
  type,
  title,
  message,
  closeToast,
}: ToastAlertProps) => {
  const config = toastConfig[type]
  const Icon = config.icon

  return (
    <div
      className={cn(
        'flex w-full items-start gap-3 rounded-lg p-4',
        config.containerClass
      )}
    >
      <div className="flex-shrink-0 pt-0.5">
        <Icon className={cn('h-5 w-5', config.iconClass)} />
      </div>
      <div className="flex-1 space-y-1">
        <p
          className={cn(
            'text-sm leading-none font-semibold',
            config.titleClass
          )}
        >
          {title}
        </p>
        <p className={cn('text-sm opacity-90', config.messageClass)}>
          {message}
        </p>
      </div>

      <button
        onClick={closeToast}
        className={cn('flex-shrink-0 transition-colors', config.buttonClass)}
      >
        <XIcon className="h-4 w-4" />
      </button>
    </div>
  )
}
