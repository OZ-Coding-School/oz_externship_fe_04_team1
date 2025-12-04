import { useApplyListModal } from '@/store/context/applyListModalContext'

export const useApplyModal = () => {
  const applyModalContext = useApplyListModal() ?? {
    applyListModalState: 'close',
    setApplyListModalState: () => {},
    applyListId: null,
    setApplyListId: () => {},
  }

  const {
    applyListModalState,
    setApplyListModalState,
    applyListId,
    setApplyListId,
  } = applyModalContext
  function onOpenModal(id: number) {
    setApplyListModalState('open')
    setApplyListId(id)
  }
  const onCloseModal = () => {
    setApplyListModalState('close')
  }

  return {
    onOpenModal,
    onCloseModal,
    applyListId,
    setApplyListId,
    applyListModalState,
  }
}
