import logoImg from '@/assets/images/logo.svg'
import LoginStateStore from '@/store/loginStateStore'
import Guest from '@/components/common/header/Guest'
import User from '@/components/common/header/User'
import MobileModal from '@/components/common/header/MobileModal'
import { Menu } from 'lucide-react'
interface HeaderProps {
  isSideBarOpen: boolean
  setIsSideBarOpen: (value: boolean) => void
}
function Header({ isSideBarOpen, setIsSideBarOpen }: HeaderProps) {
  const loginState = LoginStateStore((state) => state.loginState)
  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  return (
    <div className="w-full border-b border-solid border-[#E5E7EB]">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-[32px]">
        {isSideBarOpen && <MobileModal setIsModalOpen={setIsSideBarOpen} />}
        <div className="flex items-center gap-[15px] md:hidden">
          <Menu
            className="w-[24]px] h-[24px] cursor-pointer"
            onClick={handleSideBar}
          />
          <img src={logoImg} alt="logoImg" className="h-[35px] w-[35px]" />
        </div>
        <div className="hidden md:flex md:cursor-pointer md:items-center md:gap-[8px]">
          {/* 클릭하면 홈 화면으로 이동하게 구현해야함 */}
          <img src={logoImg} alt="logoImg" className="flex h-[35px] w-[35px]" />
          <h2 className="text-[23px] font-[700] text-[#CA8A04]">StudyHub</h2>
        </div>
        {/* 로그인 하지 않았을때의 UI */}
        {loginState === 'GUEST' && <Guest />}
        {/* 로그인 했을때 UI */}
        {loginState === 'USER' && <User />}
      </div>
    </div>
  )
}
export default Header
// 추후 Footer와 Layout 구현시 모달이 열렸을때 뒤의 백그라운드색 조정예정
