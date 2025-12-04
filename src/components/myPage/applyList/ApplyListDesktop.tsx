import StudyApplicationCard from '@/components/common/cards/StudyApplicationCard'
import useApplyList from '@/hooks/quries/useApplyList'
import noImage from '@/assets/images/noImage.png'
import { useApplyModal } from '@/hooks/useApplyModal'
function ApplyListDesktop() {
  const { data } = useApplyList()
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
      <div className="mt-6 flex flex-col gap-4">
        {data?.map((value) => (
          <StudyApplicationCard
            key={value.id}
            status={value.status}
            title={value.recruitment.title}
            thumbnail_img_url={value.recruitment.thumbnail_img_url ?? noImage}
            lectures={value.recruitment.lecture}
            tags={value.recruitment.tags}
            expected_headcount={value.recruitment.expected_headcount}
            close_at={value.recruitment.close_at}
            create_at={value.created_at}
            onClick={() => {
              onOpenModal(value.id)
            }}
          />
        ))}
      </div>
    </>
  )
}
export default ApplyListDesktop
