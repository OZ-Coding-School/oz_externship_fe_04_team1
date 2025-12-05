import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import useApplyListDetail from '@/hooks/quries/useApplyListDetail'
import { HAS_STUDY_CONFIG, STATUS_CONFIG } from '@/constant/badgeConstant'
interface ApplyListModalProps {
  applyListId: number | null
  onCloseModal: () => void
}
function ApplyListModal({ applyListId, onCloseModal }: ApplyListModalProps) {
  // 모달 닫히는 핸들러
  const { data, isLoading } = useApplyListDetail(applyListId)
  // applyListId 없으면 아무것도 렌더링 안 함
  if (!applyListId) return null

  // 로딩 또는 data 없을 때 처리
  if (isLoading || !data) return null
  // 두가지는 임시 방편 -> 추후에 수정할 예정(스켈레톤이나 항목없음 컴포넌트 활용할 예정)
  return (
    <>
      {/* 제목 부분 */}
      <div className="flex items-center justify-between border-b-2 border-solid border-gray-200 px-6 py-6">
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold text-gray-900">
            지원 상세 정보
          </span>
          <span className="text-base text-gray-600">{data.title}</span>
        </div>
        <img
          src={closeIcon}
          alt="closeIcon"
          className="h-[20px] w-[20px] cursor-pointer"
          onClick={onCloseModal}
        />
      </div>
      {/* 내용 부분 */}
      <div className="mt-6 flex flex-col gap-6 border-b-2 border-solid border-gray-200 px-6 pb-6">
        {/* 지원상태 파트 */}
        <div className="flex min-h-[56px] w-full justify-between rounded-lg bg-gray-50 p-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-gray-700">지원 상태</span>
            <span
              className={`${STATUS_CONFIG[data.status].style} px-2 py-1 whitespace-nowrap`}
            >
              {STATUS_CONFIG[data.status].label}
            </span>
          </div>
          <div className="flex flex-col gap-1 text-sm">
            <span className="text-right text-gray-700">지원 일시</span>
            <span>
              {data.updated_at?.slice(0, 10).split('-').join('.')}{' '}
              {/* 와이어프레임에 의거해 -를 .으로 변환 */}
              {data.updated_at?.slice(11, 16)}
            </span>
          </div>
        </div>
        {/* 자기소개 파트 */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-700">자기소개</span>
          <div className="min-h-[56px] w-full rounded-lg bg-gray-50 p-4 text-base text-gray-700">
            {data.self_introduction}
          </div>
        </div>
        {/* 지원동기 파트 */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-700">지원 동기</span>
          <div className="min-h-[56px] w-full rounded-lg bg-gray-50 p-4 text-base text-gray-700">
            {data.motivation}
          </div>
        </div>
        {/* 스터디 목표 파트 */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-700">스터디 목표</span>
          <div className="min-h-[56px] w-full rounded-lg bg-gray-50 p-4 text-base text-gray-700">
            {data.objective}
          </div>
        </div>
        {/* 가능한 시간대 */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-700">가능한 시간대</span>
          <div className="min-h-[56px] w-full rounded-lg bg-gray-50 p-4 text-base text-gray-700">
            {data.available_time}
          </div>
        </div>
        {/* 스터디 경험 파트 */}
        <div className="flex flex-col gap-2">
          <span className="text-sm text-gray-700">스터디 경험</span>
          <div className="min-h-[56px] w-full rounded-lg bg-gray-50 p-4 text-base text-gray-700">
            <div className="flex flex-col gap-2">
              <span
                className={`${HAS_STUDY_CONFIG[data.has_stydy_experience ? 'YES' : 'NO'].style} max-w-[60px] px-2 py-1 whitespace-nowrap`}
              >
                {
                  HAS_STUDY_CONFIG[data.has_stydy_experience ? 'YES' : 'NO']
                    .label
                }
                {/* boolean값보다는 상수로 따로 빼서 하는것이 좋아보임 */}
              </span>
              <span>{data.study_experience}</span>
            </div>
          </div>
        </div>
      </div>
      {/* 버튼 파트 */}
      <div className="flex justify-end gap-3 px-6 py-6">
        <Button variant="outline" onClick={onCloseModal}>
          닫기
        </Button>
        <Button variant="danger" size="lg">
          지원 취소
        </Button>
        {/* 지원 취소하는 api 연동하기 */}
      </div>
    </>
  )
}
export default ApplyListModal
