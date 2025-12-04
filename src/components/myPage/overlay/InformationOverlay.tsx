import { useInformationModal } from '@/hooks/useInformationModal'
import EditModal from '@/components/myPage/myInformation/modal/EditModal'
import EditPassWordModal from '@/components/myPage/myInformation/modal/EditPassWordModal'
import EditPhoneNumber from '@/components/myPage/myInformation/modal/EditPhoneNumber'
import WithDrawModal from '@/components/myPage/myInformation/modal/WithDrawModal'
function InformationOverlay() {
  const { onClose, informationModalState } = useInformationModal()
  if (!informationModalState) return null
  return (
    <div
      className="fixed inset-0 flex h-full w-full items-center justify-center bg-black/50 px-5"
      onClick={onClose}
    >
      {informationModalState === 'editModal' && <EditModal onClose={onClose} />}
      {informationModalState === 'editPassWordModal' && (
        <EditPassWordModal onClose={onClose} />
      )}
      {informationModalState === 'editPhoneNumberModal' && (
        <EditPhoneNumber onClose={onClose} />
      )}
      {informationModalState === 'withDrawModal' && (
        <WithDrawModal onClose={onClose} />
      )}
    </div>
  )
}
export default InformationOverlay
