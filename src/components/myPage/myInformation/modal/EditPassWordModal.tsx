import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
interface EditPassWordModalProps {
  onClose: () => void
}
function EditPassWordModal({ onClose }: EditPassWordModalProps) {
  return (
    <div className="bg-basic-white w-[448px] flex-col gap-6 rounded-xl border pb-8">
      <div className="flex items-center justify-between border-b-2 border-gray-200 px-6 py-8">
        <span className="text-lg font-semibold text-gray-900">
          비밀번호 변경
        </span>
        <img
          src={closeIcon}
          alt="closeIcon"
          className="cursor-pointer"
          onClick={onClose}
        />
      </div>
      {/* 폼 */}
      {/* 추후 유효성 검사 로직 추가하기 */}
      <div className="flex flex-col gap-4 px-6 py-6">
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <span className="text-gray-700b text-sm">현재 비밀번호</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <Input placeholder="현재 비밀번호를 입력해주세요" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <span className="text-gray-700b text-sm">새 비밀번호</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <Input placeholder="새 비밀번호를 입력해주세요(8자 이상)" />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-1">
            <span className="text-gray-700b text-sm">새 비밀번호 확인</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <Input placeholder="새 비밀번호를 다시 입력해주세요" />
        </div>
      </div>
      {/* 버튼 */}
      <div className="mt-6 flex justify-end gap-3 px-6">
        <Button variant="outline" onClick={onClose} className="cursor-pointer">
          취소
        </Button>
        <Button className="cursor-pointer">변경하기</Button>
      </div>
    </div>
  )
}
export default EditPassWordModal
