import StudyApplicationCard from '@/components/common/cards/StudyApplicationCard'
import NoData from '@/components/common/notFound/noData'
import useApplyList from '@/hooks/quries/useApplyList'
import { useApplyModal } from '@/hooks/useApplyModal'
function ApplyListDesktop() {
  const { data: applyListData } = useApplyList()
  const { onOpenModal } = useApplyModal()
  return (
    <>
      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold text-gray-900">지원 내역</span>
        <span className="text-base text-gray-600">
          내가 지원한 스터디 구인 공고들을 확인하세요
        </span>
      </div>
      {/* 카드 컴포넌트 */}
      {applyListData.length > 0 ? (
        <div className="mt-6 flex flex-col gap-4">
          {applyListData?.map((value) => (
            <StudyApplicationCard
              key={value.id}
              applyData={value}
              onClick={() => {
                onOpenModal(value.id)
              }}
            />
          ))}
        </div>
      ) : (
        <div className="mt-4">
          <NoData />
        </div>
      )}
    </>
  )
}
export default ApplyListDesktop
