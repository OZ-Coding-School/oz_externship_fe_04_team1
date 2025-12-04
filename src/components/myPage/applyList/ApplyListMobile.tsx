import StudyApplicationCard from '@/components/common/cards/StudyApplicationCard'
import useApplyList from '@/hooks/quries/useApplyList'
import noImage from '@/assets/images/noImage.png'
import { useApplyModal } from '@/hooks/useApplyModal'

function ApplyListMobile() {
  const { data } = useApplyList()
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
      <div className="mt-4 flex flex-col items-center gap-3">
        {data?.map((value) => (
          <StudyApplicationCard
            key={value.id}
            status={value.status}
            title={value.recruitment.title}
            lectures={value.recruitment.lecture}
            tags={value.recruitment.tags}
            thumbnail_img_url={value.recruitment.thumbnail_img_url ?? noImage}
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
export default ApplyListMobile
