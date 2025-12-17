import { useApplyModal } from '@/hooks/useApplyModal'
import ApplyListModal from '@/components/myPage/applyList/ApplyListModal'

function ApplyOverLay() {
  const { onCloseModal, applyListModalState, applyListId } = useApplyModal()
  if (applyListModalState === 'close') return null
  return (
    <div
      className="fixed inset-0 z-1 flex h-full w-full items-center justify-center bg-black/50 px-5"
      onClick={onCloseModal}
    >
      {applyListModalState === 'open' && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-basic-white z-[100] h-[400px] w-[672px] overflow-y-auto rounded-xl md:h-[700px]"
        >
          <ApplyListModal
            onCloseModal={onCloseModal}
            applyListId={applyListId}
          />
        </div>
      )}
    </div>
  )
}
export default ApplyOverLay
