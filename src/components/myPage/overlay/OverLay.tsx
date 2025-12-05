import { useInformationModal } from '@/hooks/useInformationModal'
import EditModal from '@/components/myPage/myInformation/modal/EditModal'
import EditPassWordModal from '@/components/myPage/myInformation/modal/EditPassWordModal'
import EditPhoneNumber from '@/components/myPage/myInformation/modal/EditPhoneNumber'
import WithDrawModal from '@/components/myPage/myInformation/modal/WithDrawModal'
import ModalLayout from './ModalLayout'

function OverLay() {
  const { onClose, informationModalState } = useInformationModal()
  if (!informationModalState) return null
  const modalState = {
    editModal: <EditModal onClose={onClose} />,
    editPassWordModal: <EditPassWordModal onClose={onClose} />,
    editPhoneNumberModal: <EditPhoneNumber onClose={onClose} />,
    withDrawModal: <WithDrawModal onClose={onClose} />,
  }
  return <ModalLayout>{modalState[informationModalState]}</ModalLayout>
}
export default OverLay
