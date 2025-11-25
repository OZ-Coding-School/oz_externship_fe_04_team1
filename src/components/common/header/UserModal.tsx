import logoutIcon from '@/assets/icons/logout.svg'
import modalProfileIcon from '@/assets/icons/modalProfileIcon.svg'
function UserModal() {
  return (
    <div className="absolute top-[57.05px] right-[112px] flex h-[99px] w-[192px] flex-col gap-[8px] rounded-[8px] border border-solid border-[#E5E7EB] bg-[#ffffff] drop-shadow-[0_10px_15px_rgba(0,0,0,0.2)]">
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
        <span>마이페이지</span>
        {/* 클릭하면 마이페이지로 이동 */}
      </div>
    </div>
  )
}
export default UserModal
