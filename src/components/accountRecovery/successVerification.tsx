import closeIcon from '@/assets/icons/close.svg'
import successIcon from '@/assets/icons/success.svg'
interface SuccessVerificationProps {
  onClose: () => void
}

export default function SuccessVerification({
  onClose,
}: SuccessVerificationProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* 기존 모달 박스 */}
      <div className="flex h-[200px] w-[406px] flex-col rounded-xl bg-white p-6">
        <div className="flex h-6 justify-end">
          <img
            src={closeIcon}
            alt="closeIcon"
            className="cursor-pointer"
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <img src={successIcon} alt="account" className="mb-4" />

          <p className="mb-4 text-lg font-bold">계정 복구 완료!</p>
          <p className="mb-10 text-sm text-gray-600">
            지금바로 로그인해 보세요
          </p>
        </div>
      </div>
    </div>
  )
}
