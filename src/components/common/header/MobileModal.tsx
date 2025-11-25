import LoginStateStore from '@/store/loginStateStore'
import logo from '@/assets/images/logo.svg'
import close from '@/assets/icons/close.svg'
import study from '@/assets/icons/study.svg'
import classIcon from '@/assets/icons/class.svg'
import announcement from '@/assets/icons/announcement.svg'
import defaultProfileImg from '@/assets/images/defaultProfileImg.svg'
import logoutIcon from '@/assets/icons/logout.svg'
interface MobileModalProps {
  setIsModalOpen: (value: boolean) => void
}
function MobileModal({ setIsModalOpen }: MobileModalProps) {
  const loginState = LoginStateStore((state) => state.loginState)
  return (
    <div className="fixed top-[0] left-[0] h-screen w-[263px] bg-[#FFFFFF] pt-[16px] md:hidden">
      <div className="border-b border-solid border-[#E5E7EB]">
        <div className="ml-[16px] flex items-center gap-[172px] pb-[15px]">
          <img src={logo} alt="logo" className="w-[32px h-[32px]" />
          <img
            src={close}
            alt="close"
            className="h-[28px] w-[28px]"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
      </div>
      <div className="ml-[28px] flex flex-col gap-[8px] py-[16px]">
        <span className="flex h-[36px] items-center text-[16px] font-[600] text-[#6B7280]">
          메뉴
        </span>
        <div className="flex h-[48px] items-center gap-[12px]">
          <img src={classIcon} alt="classIcon" />
          <span>강의 목록</span>
        </div>
        <div className="flex h-[48px] items-center gap-[12px]">
          <img src={study} alt="studyIcon" />
          <span>스터디 그룹</span>
        </div>
        <div className="flex h-[48px] items-center gap-[12px]">
          <img src={announcement} alt="announcementIcon" />
          <span>구인 광고</span>
        </div>
      </div>
      {/* user 일때만 나타나게 */}
      {loginState === 'USER' && (
        <div className="absolute bottom-[25px] flex h-[117px] w-full flex-col gap-[12px] border-t border-solid border-[#E5E7EB] p-[16px]">
          <div className="flex items-center gap-[12px]">
            <img
              src={defaultProfileImg}
              alt="defaultProfileImg"
              className="h-[60px] w-[60px] rounded-full"
            />
            {/* 추후 api 연동으로 이미지 불러오게 */}
            <div className="flex flex-col">
              <span className="text-[17px] font-[600] text-[#111827]">
                김 개발
              </span>
              <span className="text-[15px] font-[400] text-[#4B5563]">
                kim.dev@example.com
              </span>
              {/* 추후 api 연동으로 이름 및 이메일 불러오게 */}
            </div>
          </div>
          <button className="flex cursor-pointer items-center justify-center gap-[13px] rounded-[8px] bg-[#F3F4F6] px-[16px] py-[8px]">
            <img src={logoutIcon} alt="logoutIcon" />
            <span className="text-[16px] font-[500] text-[#374151]">
              로그아웃
            </span>
          </button>
          {/* 버튼 컴포넌트 완료되면 버튼 컴포넌트로 커스텀 + 로그아웃 시키기 */}
        </div>
      )}
    </div>
  )
}
export default MobileModal
