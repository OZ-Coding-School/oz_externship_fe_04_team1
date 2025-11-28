import MobileButton from './MobileButton'
import MobileUserForm from './MobileUserForm'
import MobileUserHeader from './MobileUserHeader'

function MobileEditUserInformation() {
  return (
    <div className="flex flex-col items-center p-4">
      {/* 이름, 아이디, 사진 나타내는 컴포넌트 */}
      <MobileUserHeader />
      {/* 사용자의 form요소 나타내는 컴포넌트 */}
      <MobileUserForm />
      {/* 버튼부분 컴포넌트 */}
      <MobileButton />
    </div>
  )
}
export default MobileEditUserInformation
