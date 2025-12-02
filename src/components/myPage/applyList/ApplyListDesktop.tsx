import StudyApplicationCard from '@/components/common/cards/StudyApplicationCard'
import useApplyList from '@/hooks/quries/useApplyList'
import noImage from '@/assets/images/noImage.png'
import { useOutletContext } from 'react-router'
function ApplyListDesktop() {
  const { data } = useApplyList()
  const { setIsApplyListModalOpen, setApplyListId } = useOutletContext<{
    setIsApplyListModalOpen: (isOpen: boolean) => void
    setApplyListId: (id: number) => void
  }>()
  return (
    <div className="bg-basic-white rounded-xl border border-solid border-gray-200 px-8 py-8">
      {/* 제목 */}
      <div className="flex flex-col gap-2">
        <span className="text-2xl font-semibold text-gray-900">지원 내역</span>
        <span className="text-base text-gray-600">
          내가 지원한 스터디 구인 공고들을 확인하세요
        </span>
      </div>
      {/* 카드 컴포넌트 */}
      <div className="mt-6 flex flex-col gap-4">
        {data?.map((value) =>
          value.recruitment.map((v) => (
            <StudyApplicationCard
              key={value.id}
              status={value.status}
              title={v.title}
              thumbnail_img_url={v.thumbnail_img_url ?? noImage}
              lectures={v.lecture}
              tags={v.tags}
              expected_headcount={v.expected_headcount}
              close_at={v.close_at}
              create_at={value.created_at}
              onClick={() => {
                setIsApplyListModalOpen(true)
                setApplyListId(value.id)
              }}
            />
          ))
        )}
      </div>
    </div>
  )
}
export default ApplyListDesktop
