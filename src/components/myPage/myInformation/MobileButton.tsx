import { useOutletContext } from 'react-router'

function MobileButton() {
  const { setIsEditModalOpen } = useOutletContext<{
    setIsEditModalOpen: (value: boolean) => void
  }>()
  const { setIsEditPassWordModalOpen } = useOutletContext<{
    setIsEditPassWordModalOpen: (value: boolean) => void
  }>()
  // 수정 모달 핸들러
  const handleEditModalOpen = () => {
    setIsEditModalOpen(true)
  }
  // 비밀번호 변경 모달 핸들러
  const handleEditPassWordModalOpen = () => {
    setIsEditPassWordModalOpen(true)
  }
  return (
    // 회원탈퇴 핸들러 로직 추거허가
    <div className="mt-[25px] flex w-full flex-col gap-3">
      <button
        className="bg-primary-500 text-basic-white w-full cursor-pointer rounded-lg py-2"
        onClick={handleEditModalOpen}
      >
        프로필 수정
      </button>
      <div className="flex gap-2">
        <button
          className="text-basic-white w-1/2 cursor-pointer rounded-lg bg-gray-500 py-2"
          onClick={handleEditPassWordModalOpen}
        >
          비밀번호 변경
        </button>
        <button className="text-basic-white bg-danger-500 w-1/2 cursor-pointer rounded-lg py-2">
          회원 탈퇴
        </button>
      </div>
    </div>
  )
}
export default MobileButton
