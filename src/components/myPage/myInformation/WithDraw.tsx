import { useOutletContext } from 'react-router'

function WithDraw() {
  const { setIsWithDrawModalOpen } = useOutletContext<{
    setIsWithDrawModalOpen: (value: boolean) => void
  }>()
  const handleWithDrawModalOpen = () => {
    setIsWithDrawModalOpen(true)
  }
  return (
    <div className="mx-8 border-t-2 border-solid border-gray-200 py-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-lg font-semibold text-gray-900">회원 탈퇴</span>
          <div className="flex gap-3">
            <span className="text-sm text-gray-600">
              계정을 삭제하고 서비스를 떠날 수 있습니다
            </span>
            <span className="text-primary-600 text-sm">
              탈퇴 후 2주간 계정 복구가 가능합니다
            </span>
          </div>
        </div>
        <button
          className="text-basic-white bg-danger-500 cursor-pointer rounded-lg px-6 py-2"
          onClick={handleWithDrawModalOpen}
        >
          회원 탈퇴
        </button>
      </div>
    </div>
  )
}
export default WithDraw
