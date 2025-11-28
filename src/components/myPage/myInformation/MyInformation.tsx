import UserInformationForm from '@/components/myPage/myInformation/UserInformationForm'
import EditPassWord from '@/components/myPage/myInformation/EditPassWord'
import WithDraw from '@/components/myPage/myInformation/WithDraw'
import MobileEditUserInformation from '@/components/myPage/myInformation/MobileEditUserInformation'
function MyInformation() {
  return (
    <div className="bg-basic-white flex flex-col md:gap-8">
      {/* 너비 추후 수정 */}
      <div className="flex items-center justify-between md:p-8">
        {/* 제목 및 버튼 파트 */}
        <div className="hidden md:flex md:flex-col md:gap-2">
          <span className="text-2xl font-bold text-gray-900">내 정보</span>
          <span className="text-base text-gray-600">
            회원 정보를 확인하고 수정할 수 있습니다
          </span>
        </div>
        <button className="md:bg-primary-500 md:text-basic-white hidden md:block md:h-[40px] md:w-[106.89px] md:cursor-pointer md:rounded-lg md:px-6 md:py-2">
          수정하기
        </button>
        {/* 버튼 누르면 수정 모달 나타나게 수정해야함 */}
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
    </div>
  )
}
export default MyInformation
