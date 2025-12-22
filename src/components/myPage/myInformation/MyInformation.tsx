import UserInformationForm from '@/components/myPage/myInformation/UserInformationForm'
import EditPassWord from '@/components/myPage/myInformation/EditPassWord'
import WithDraw from '@/components/myPage/myInformation/WithDraw'
import MobileEditUserInformation from '@/components/myPage/myInformation/MobileEditUserInformation'
import { useInformationModal } from '@/hooks/useInformationModal'
import OverLay from '@/components/myPage/overlay/OverLay'
function MyInformation() {
  const { openModal } = useInformationModal()
  return (
    <>
      <OverLay />
      <div className="flex items-center justify-between md:p-8">
        {/* 제목 및 버튼 파트 */}
        <div className="hidden md:flex md:flex-col md:gap-2">
          <span className="text-2xl font-bold text-gray-900">내 정보</span>
          <span className="text-base text-gray-600">
            회원 정보를 확인하고 수정할 수 있습니다
          </span>
        </div>
        <button
          className="md:bg-primary-500 md:text-basic-white hidden md:block md:w-[106.89px] md:cursor-pointer md:rounded-lg md:px-6 md:py-2"
          onClick={() => openModal('editModal')}
        >
          수정하기
        </button>
      </div>
      {/* 유저 정보를 나타내는 컴포넌트 */}
      <div className="hidden md:block">
        <UserInformationForm />
        {/* 비밀번호 변경 컴포넌트 */}
        <EditPassWord />
        {/* 회원 탈퇴 컴포넌트 */}
        <WithDraw />
      </div>
      <div className="md:hidden">
        <MobileEditUserInformation />
      </div>
    </>
  )
}
export default MyInformation
