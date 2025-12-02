import StudyApplicationCard from '@/components/common/cards/StudyApplicationCard'
import useApplyList from '@/hooks/quries/useApplyList'
import noImage from '@/assets/images/noImage.png'
import { useOutletContext } from 'react-router'

function ApplyListMobile() {
  const { data } = useApplyList()
  const { setIsApplyListModalOpen, setApplyListId } = useOutletContext<{
    setIsApplyListModalOpen: (isOpen: boolean) => void
    setApplyListId: (id: number) => void
  }>()
  return (
    <div className="bg-basic-white flex w-full min-w-[352px] flex-col gap-3 rounded-xl border-2 border-solid border-gray-200 px-4 py-4">
      {/* 제목부분 */}
      <div className="flex flex-col gap-2">
        <span className="text-lg font-semibold text-gray-900">지원 내역</span>
        <span className="text-sm text-gray-600">
          내가 지원한 스터디 구인 공고들을 확인하세요
        </span>
      </div>
      <div className="mt-4 flex flex-col items-center gap-3">
        {data?.map((value) =>
          value.recruitment.map((v) => (
            <StudyApplicationCard
              key={value.id}
              status={value.status}
              title={v.title}
              lectures={v.lecture}
              tags={v.tags}
              thumbnail_img_url={v.thumbnail_img_url ?? noImage}
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
export default ApplyListMobile
