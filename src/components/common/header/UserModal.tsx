import logoutIcon from '@/assets/icons/logout.svg'
import modalProfileIcon from '@/assets/icons/modalProfileIcon.svg'
import { ROUTE_PATHS } from '@/constant/route'
import { useNavigate } from 'react-router'
function UserModal() {
  const navigate = useNavigate()
  return (
    <div className="hidden md:absolute md:top-[45.05px] md:right-[10px] md:z-10 md:flex md:h-[99px] md:w-[192px] md:flex-col md:gap-[8px] md:rounded-lg md:border md:border-solid md:border-[#E5E7EB] md:bg-[#ffffff] md:drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]">
      <div className="mt-[13px] flex cursor-pointer items-center gap-[12px] border-t-[2px] border-solid border-[#f3f4f6] px-[16px] py-[10px] pt-[5px] text-[16px] text-[#374151]">
        <img src={logoutIcon} alt="logoutIcon" className="h-[18px] w-[18px]" />
        <span>로그아웃</span>
        {/* 클릭하면 로그아웃 시키기 */}
      </div>
      <div className="py-[10px]text-[16px] flex cursor-pointer items-center gap-[12px] px-[16px] text-[#374151]">
        <img
          src={modalProfileIcon}
          alt="modalProfileIcon"
          className="h-[18px] w-[18px]"
        />
        <span onClick={() => navigate(ROUTE_PATHS.MYPAGE.MY_INFORMATION)}>
          마이페이지
        </span>
        {/* 클릭하면 마이페이지로 이동 */}
      </div>
    </div>
  )
}
export default UserModal
