import useUserData from '@/hooks/quries/useUserData'
import SideNaigationNavigate from '@/components/common/sideNavigation/SideNavigationNavigate'
import MobileSideNagigation from './MobileSideNavigation'
import defaultImg from '@/assets/images/defaultProfileImg.svg'
function SideNavigation() {
  const { data: userData } = useUserData()
  return (
    <div>
      <div className="hidden md:block">
        <div className="bg-basic-white flex h-[591px] w-[280px] flex-col gap-8 rounded-xl border-2 border-solid border-gray-200">
          <div className="mt-[25px] flex flex-col items-center">
            <img
              src={userData?.profile_img_url || defaultImg}
              alt="defaultImg"
              className="h-[80px] w-[80px] rounded-full"
            />
            <h3 className="mt-[16px] h-[28px] text-lg font-semibold text-gray-900">
              {userData?.name}
            </h3>
            <span className="mt-[8px] text-sm text-gray-600">
              {userData?.email}
            </span>
            <span className="mt-[8px] text-xs text-gray-500">
              가입일 : {userData?.created_at?.slice(0, 4)}년{' '}
              {userData?.created_at?.slice(5, 7)}월{' '}
            </span>
          </div>
          <SideNaigationNavigate />
        </div>
      </div>
      <div className="flex justify-center md:hidden">
        <MobileSideNagigation />
      </div>
    </div>
  )
}
export default SideNavigation
