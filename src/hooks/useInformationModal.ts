import { useMyInformationModal } from '@/store/context/myInformationModalContext'

// 기본정보에 대한 모달 상태 관리 -> 열림 닫힘 이런거 같이 관리
export const useInformationModal = () => {
  const editModalContext = useMyInformationModal() ?? {
    informationModalState: null,
    setInformationModalState: () => {},
  }
  const { setInformationModalState, informationModalState } = editModalContext
  // 여는 핸들러 관리
  const openEditModal = () => {
    setInformationModalState('editModal')
  }
  const openEditPassWordModal = () => {
    setInformationModalState('editPassWordModal')
  }
  const openEditPhoneNumberModal = () => {
    setInformationModalState('editPhoneNumberModal')
  }
  const openWithDrawModal = () => {
    setInformationModalState('withDrawModal')
  }
  // 모달 닫히는 것
  const onClose = () => {
    setInformationModalState(null)
  }
  return {
    openEditModal,
    openEditPassWordModal,
    openEditPhoneNumberModal,
    openWithDrawModal,
    onClose,
    informationModalState,
  }
}
