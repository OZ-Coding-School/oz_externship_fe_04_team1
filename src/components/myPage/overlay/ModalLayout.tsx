import type { ReactNode } from 'react'
import { useInformationModal } from '@/hooks/useInformationModal'

function ModalLayout({ children }: { children: ReactNode }) {
  // 기본정보 모달 종료
  const { onClose } = useInformationModal()
  return (
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5"
      onClick={onClose}
    >
      {children}
    </div>
  )
}
export default ModalLayout
