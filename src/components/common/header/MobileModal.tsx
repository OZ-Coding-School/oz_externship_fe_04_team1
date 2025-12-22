import LoginStateStore from '@/store/loginStateStore'
import logo from '@/assets/images/logo.svg'
import close from '@/assets/icons/close.svg'
import study from '@/assets/icons/study.svg'
import classIcon from '@/assets/icons/class.svg'
import announcement from '@/assets/icons/announcement.svg'
import logoutIcon from '@/assets/icons/logout.svg'
import profileImage from '@/assets/icons/profileImg.svg'
import useUserData from '@/hooks/quries/useUserData'
import { useNavigate } from 'react-router'
import { ROUTE_PATHS } from '@/constant/route'
import MyPageStateStore from '@/store/mypageStateStore'
import Button from '../Button'
import { logout } from '@/api/auth/logout'
import AuthStateStore from '@/store/authStateStore'
import { showToast } from '../toast/Toast'
import defaultImg from '@/assets/images/defaultProfileImg.svg'
interface MobileModalProps {
  setIsModalOpen: (value: boolean) => void
}
function MobileModal({ setIsModalOpen }: MobileModalProps) {
  const navigate = useNavigate()
  const loginState = LoginStateStore((state) => state.loginState)
  const setLoginState = LoginStateStore((state) => state.setLoginState)
  const setMyPageState = MyPageStateStore((state) => state.setMyPageState)
  const { data: userData } = useUserData()
  return (
    <div className="bg-basic-white fixed top-[0] left-[0] z-10 h-screen w-[263px] pt-4 md:hidden">
      <div className="border-b border-solid border-gray-200">
        <div className="ml-4 flex items-center gap-43 pb-[15px]">
          <img src={logo} alt="logo" className="h-[32px] w-[32px]" />
          <img
            src={close}
            alt="close"
            className="h-[28px] w-[28px]"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </div>
      <div className="ml-7 flex flex-col gap-2 py-4">
        <span className="flex h-[36px] items-center text-base font-semibold text-gray-400">
          메뉴
        </span>
        <div className="flex h-[48px] items-center gap-3">
          <img src={classIcon} alt="classIcon" />
          <a
            href="https://learn.ozcoding.site/courses"
            target="_blank"
            rel="noreferrer"
          >
            강의 목록
          </a>
          {/* 강의목록 페이지로 렌더링 */}
        </div>
        <div className="flex h-[48px] items-center gap-3">
          <img src={study} alt="studyIcon" />
          <p
            onClick={() => {
              if (loginState === 'GUEST') {
                showToast.error('실패', '로그인 후 이용할 수 있는 서비스입니다')
                navigate(ROUTE_PATHS.LOGIN)
              } else {
                navigate('https://study.ozcoding.site/')
              }
            }}
          >
            스터디 그룹
          </p>
          {/* 로그인 화면으로 렌더링 */}
        </div>
        <div className="flex h-[48px] items-center gap-3">
          <img src={announcement} alt="announcementIcon" />
          <a
            href="https://learn.ozcoding.site/recruitments"
            target="_blank"
            rel="noreferrer"
          >
            구인 광고
          </a>
          {/* 구인광고 페이지로 렌더링 */}
        </div>
      </div>
      {/* user 일때만 나타나게 */}
      {loginState === 'USER' && (
        <div className="absolute bottom-[70px] mb-6 flex h-[117px] w-full flex-col gap-3 border-t border-solid border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <img
              src={userData?.profile_img_url || defaultImg}
              alt="profile_img"
              className="h-[60px] w-[60px] rounded-full"
            />
            <div className="flex flex-col">
              <span className="font-semiblod text-base text-gray-900">
                {userData?.name}
              </span>
              <span className="text-base font-normal text-gray-600">
                {userData?.email}
              </span>
            </div>
          </div>
          <Button
            className="hover:bg-parent flex cursor-pointer items-center justify-center bg-[#FEF9C3]"
            onClick={() => {
              navigate(ROUTE_PATHS.MYPAGE)
              setMyPageState('MY_INFORMATION')
            }}
          >
            <img src={profileImage} alt="profileImg" />
            <span className="text- text-primary-600 text-base font-medium">
              마이페이지
            </span>
          </Button>
          <Button
            className="hover:bg-parent flex cursor-pointer items-center justify-center gap-[13px] rounded-lg bg-gray-100 px-4 py-2"
            onClick={async () => {
              await logout()
              setLoginState('GUEST')
              AuthStateStore.getState().setAccessToken(null)
              setIsModalOpen(false)
              navigate(ROUTE_PATHS.HOME)
            }}
          >
            <img src={logoutIcon} alt="logoutIcon" />
            <span className="text-base font-medium text-gray-700">
              로그아웃
            </span>
          </Button>
          {/* 모든 렌더링 될때 제일 상단으로 올라가는 훅 호출하기 */}
        </div>
      )}
    </div>
  )
}
export default MobileModal
