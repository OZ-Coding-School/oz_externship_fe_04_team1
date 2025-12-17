import StudyApplicationCard from '@/components/common/cards/StudyApplicationCard'
import NoData from '@/components/common/notFound/noData'
import useApplyList from '@/hooks/quries/useApplyList'
import { useApplyModal } from '@/hooks/useApplyModal'

function ApplyListMobile() {
  const { data: applyListData } = useApplyList()
  const { onOpenModal } = useApplyModal()
  return (
    <>
      {/* 제목부분 */}
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold text-gray-900">지원 내역</span>
        <span className="text-sm text-gray-600">
          내가 지원한 스터디 구인 공고들을 확인하세요
        </span>
      </div>
      {applyListData.length > 0 ? (
        <div className="mt-4 flex flex-col items-center gap-3">
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
export default ApplyListMobile
