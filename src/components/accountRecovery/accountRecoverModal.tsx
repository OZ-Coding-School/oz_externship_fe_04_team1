import account from '@/assets/account.svg'
import Button from '@/components/common/Button'

interface RecoverModalProps {
  isOpen: boolean
  onNext?: () => void
  onClose: () => void
  email?: string
  date?: string
}

export default function AccountRecoverModal({
  onNext,
  isOpen,
  onClose,
}: RecoverModalProps) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      {/* 기존 모달 박스 */}
      <div className="flex h-[300px] w-[406px] flex-col rounded-xl bg-white p-6">
        <div className="flex h-6 justify-end">
          <button className="cursor-pointer" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
          <img src={account} alt="account" className="mb-4" />

          <p className="mb-4 text-lg font-bold">해당 계정은 탈퇴된 상태예요</p>
          <p className="mb-10 text-sm text-gray-600">
            `계정 삭제되는 날짜`이후, 계정 정보는 완전히 삭제돼요.
            <br /> 계정을 다시 사용하려면 아래버튼을 눌러 복구를 진행해주세요.
          </p>
          <Button
            className="px-20 py-3"
            onClick={() => {
              onNext?.()
            }}
          >
            계정 다시사용하기
          </Button>
        </div>
      </div>
    </div>
  )
}
