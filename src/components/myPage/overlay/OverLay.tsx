import { useInformationModal } from '@/hooks/useInformationModal'
import EditModal from '@/components/myPage/myInformation/modal/EditModal'
import EditPassWordModal from '@/components/myPage/myInformation/modal/EditPassWordModal'
import EditPhoneNumber from '@/components/myPage/myInformation/modal/EditPhoneNumber'
import WithDrawModal from '@/components/myPage/myInformation/modal/WithDrawModal'

function OverLay() {
  const { onClose, informationModalState } = useInformationModal()
  if (!informationModalState) return null
  return (
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5"
      onClick={onClose}
    >
      {informationModalState === 'editModal' && (
        <div
          className="bg-basic-white z-10 h-[600px] w-[450px] flex-col overflow-y-auto rounded-xl md:h-[730px] md:w-[512px]"
          onClick={(e) => e.stopPropagation()}
        >
          <EditModal onClose={onClose} />
        </div>
      )}
      {informationModalState === 'editPassWordModal' && (
        <div
          className="bg-basic-white w-[448px] flex-col gap-6 rounded-xl border pb-8"
          onClick={(e) => e.stopPropagation()}
        >
          <EditPassWordModal onClose={onClose} />
        </div>
      )}
      {informationModalState === 'editPhoneNumberModal' && (
        <div
          className="bg-basic-white flex w-[512px] flex-col rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <EditPhoneNumber onClose={onClose} />
        </div>
      )}
      {informationModalState === 'withDrawModal' && (
        <div
          className="bg-basic-white flex h-[625px] w-[448px] flex-col rounded-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <WithDrawModal onClose={onClose} />
        </div>
      )}
    </div>
  )
}
export default OverLay
