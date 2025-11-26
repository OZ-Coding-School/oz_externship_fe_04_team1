import logoImg from '@/assets/images/logo.svg'
import LoginStateStore from '@/store/loginStateStore'
import Guest from '@/components/common/header/Guest'
import User from '@/components/common/header/User'
import MobileModal from '@/components/common/header/MobileModal'
import { Menu } from 'lucide-react'
import { ROUTE_PATHS } from '@/constant/route'
import { useNavigate } from 'react-router'
interface HeaderProps {
  isSideBarOpen: boolean
  setIsSideBarOpen: (value: boolean) => void
}
function Header({ isSideBarOpen, setIsSideBarOpen }: HeaderProps) {
  const navigate = useNavigate()
  const loginState = LoginStateStore((state) => state.loginState)
  const handleSideBar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }

  return (
    <div className="w-full border-b border-solid border-[#E5E7EB]">
      <div className="mx-auto flex h-[64px] max-w-[1440px] items-center justify-between px-8">
        {isSideBarOpen && <MobileModal setIsModalOpen={setIsSideBarOpen} />}
        <div className="flex items-center gap-[15px] md:hidden">
          <Menu
            className="h-[24px] w-[24px] cursor-pointer"
            onClick={handleSideBar}
          />
          <img
            src={logoImg}
            alt="logoImg"
            className="h-[35px] w-[35px] cursor-pointer"
            onClick={() => navigate(ROUTE_PATHS.HOME)}
          />
        </div>
        <div
          className="hidden md:flex md:cursor-pointer md:items-center md:gap-2"
          onClick={() => navigate(ROUTE_PATHS.HOME)}
        >
          <img src={logoImg} alt="logoImg" className="flex h-[35px] w-[35px]" />
          <h2 className="text-2xl font-bold text-[#CA8A04]">StudyHub</h2>
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
