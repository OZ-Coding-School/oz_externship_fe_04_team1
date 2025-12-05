import { useMyInformationModal } from '@/store/context/myInformationModalContext'
import type { NotNullInformationModalVariant } from '@/types/myInformationModal'
// 기본정보에 대한 모달 상태 관리 -> 열림 닫힘 이런거 같이 관리
export const useInformationModal = () => {
  const editModalContext = useMyInformationModal() ?? {
    informationModalState: null,
    setInformationModalState: () => {},
  }
  const { setInformationModalState, informationModalState } = editModalContext
  // 여는 핸들러 관리
  const openModal = (modalState: NotNullInformationModalVariant) => {
    setInformationModalState(modalState)
  }
  // 모달 닫히는 것
  const onClose = () => {
    setInformationModalState(null)
  }
  return {
    openModal,
    onClose,
    informationModalState,
  }
}
