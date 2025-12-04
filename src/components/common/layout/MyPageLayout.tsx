import Header from '@/components/common/header/Header'
import { useState } from 'react'
import { Outlet } from 'react-router'
import SideNavigation from '@/components/common/sideNavigation/SideNavigation'
import ApplyListModal from '@/components/myPage/applyList/ApplyListModal'
import CompleteStudyReviewModal from '@/components/myPage/completeStudy/CompleteStudyReviewModal'
import type { Review } from '@/types/review'
import { MyInformationModalProvider } from '@/store/context/myInformationModalContext'
function MyPageLayout() {
  // 사이드바 상태
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)
  // 지원 내역 상세 모달 상태
  const [isApplyListModalOpen, setIsApplyListModalOpen] = useState(false)
  // 선택된 항목에 대한 id 상태 관리
  const [applyListId, setApplyListId] = useState<number | null>(null)
  // 리뷰 모달 상태
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  // 어떤 완료된 스터디에 관한 정보인지 상태
  const [completeStudyStore, setCompleteStudyStore] = useState<
    Review | undefined
  >(undefined)

  return (
    <MyInformationModalProvider>
      <div className="flex min-h-screen w-full flex-col">
        <Header
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
        <div className="flex w-full flex-1 bg-gray-50 p-8">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row">
            <SideNavigation />
            {/* Outlet 요소에 props를 전달하기 위해 context사용 */}
            <div className="bg-basic-white w-full rounded-xl border border-solid border-gray-200 px-8 py-8">
              <Outlet
                context={{
                  setIsApplyListModalOpen: setIsApplyListModalOpen,
                  setApplyListId: setApplyListId,
                  setIsReviewModalOpen: setIsReviewModalOpen,
                  setCompleteStudyStore: setCompleteStudyStore,
                }}
              />
            </div>
          </div>
        </div>
        {isSideBarOpen && (
          <div className="fixed inset-0 h-full w-full bg-black opacity-50 md:hidden"></div>
        )}
        {isApplyListModalOpen && (
          <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5">
            <ApplyListModal
              setIsApplyListModalOpen={setIsApplyListModalOpen}
              applyListId={applyListId}
            />
          </div>
        )}
        {isReviewModalOpen && (
          <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5">
            <CompleteStudyReviewModal
              setIsReviewModalOpen={setIsReviewModalOpen}
              completeStudyStore={completeStudyStore}
            />
          </div>
        )}
      </div>
    </MyInformationModalProvider>
  )
}
export default MyPageLayout
