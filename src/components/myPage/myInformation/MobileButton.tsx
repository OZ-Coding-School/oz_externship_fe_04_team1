import { useInformationModal } from '@/hooks/useInformationModal'

function MobileButton() {
  const { openModal } = useInformationModal()
  return (
    <div className="mt-[25px] flex w-full flex-col gap-3">
      <button
        className="bg-primary-500 text-basic-white w-full cursor-pointer rounded-lg py-2"
        onClick={() => openModal('editModal')}
      >
        프로필 수정
      </button>
      <div className="flex gap-2">
        <button
          className="text-basic-white w-1/2 cursor-pointer rounded-lg bg-gray-500 py-2"
          onClick={() => openModal('editPassWordModal')}
        >
          비밀번호 변경
        </button>
        <button
          className="text-basic-white bg-danger-500 w-1/2 cursor-pointer rounded-lg py-2"
          onClick={() => openModal('withDrawModal')}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  )
}
export default MobileButton
