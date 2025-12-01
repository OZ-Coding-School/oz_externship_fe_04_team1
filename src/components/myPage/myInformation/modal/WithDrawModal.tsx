import alertIcon from '@/assets/icons/alertIcon.svg'
import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import DeleteReasonModal from '@/components/common/DeleteReasonModal'
import { ToastAlert } from '@/components/common/toast/ToastAlert'
interface WithDrawModalProps {
  setIsWithDrawModalOpen: (value: boolean) => void
}

function WithDrawModal({ setIsWithDrawModalOpen }: WithDrawModalProps) {
  const handleCloseWithDrawModal = () => {
    setIsWithDrawModalOpen(false)
  }
  const options = [
    '더 이상 필요하지 않음',
    '흥미/관심 부족',
    '사용이 너무 어려움',
    '더 나은 서비스 발견',
    '개인 정보 문제',
    '서비스 품질 불량',
    '기술적 문제',
    '콘텐츠 부족',
    '기타',
  ]
  return (
    <div className="bg-basic-white flex h-[625px] w-[448px] flex-col rounded-xl">
      {/* 헤더부분 */}
      <div className="flex items-center justify-between border-b-2 border-solid border-gray-200 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="bg-danger-50 flex h-[40px] w-[40px] items-center justify-center rounded-full">
            <img
              src={alertIcon}
              alt="alertIcon"
              className="h-[19px] w-[19px]"
            />
          </div>
          <span className="text-lg font-semibold text-gray-900">회원 탈퇴</span>
        </div>
        <img
          src={closeIcon}
          alt="closeIcon"
          className="h-[20px] w-[20px] cursor-pointer"
          onClick={handleCloseWithDrawModal}
        />
      </div>
      {/* 메인부분 */}
      <div className="flex flex-col gap-6 border-b-2 border-solid border-gray-200 px-6 pt-6 pb-11">
        <ToastAlert
          type="alert"
          title="회원 탈퇴 안내"
          message="• 탈퇴 즉시 서비스 이용이 중단됩니다
        • 2주간 계정 복구가 가능합니다
        • 2주후 모든 개인정복사 완전히 삭제됩니다"
        />
        {/* 폼 부분 */}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <span className="text-sm text-gray-700">탈퇴 사유</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <DeleteReasonModal
            defaultValue="탈퇴 사유를 선택해주세요"
            options={options}
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex gap-1">
            <span className="text-sm text-gray-700">탈퇴 상세 사유</span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
          <textarea
            className="bg-basic-white h-[80px] resize-none rounded-lg border border-solid border-gray-300 px-3 py-2 text-sm"
            placeholder="탈퇴 사유를 입력해주세요"
          />
        </div>
        {/* 체크박스 부분 */}
        <div className="flex gap-2">
          <input type="checkbox" />
          <div className="flex gap-1">
            <span className="text-sm text-gray-700">
              회원 탈퇴에 동의합니다
            </span>
            <span className="text-danger-500 text-sm">*</span>
          </div>
        </div>
      </div>
      {/* 버튼 부분 */}
      <div className="flex justify-end gap-3 p-6">
        <Button variant="outline" onClick={handleCloseWithDrawModal}>
          취소
        </Button>
        <Button variant="danger">회원 탈퇴</Button>
        {/* 버튼 눌렀을때 DELETE 로직 추가하기 + POST(사유 전달?) */}
      </div>
    </div>
  )
}
export default WithDrawModal
