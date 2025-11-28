import useUserData from '@/hooks/quries/useUserData'
import SideNaigationNavigate from '@/components/common/sideNavigation/SideNavigationNavigate'
import MobileSideNagigation from './MobileSideNavigation'
function SideNavigation() {
  const { data } = useUserData()
  return (
    <div>
      <div className="hidden md:block">
        <div className="bg-basic-white flex h-[591px] w-[280px] flex-col gap-8 rounded-xl border-2 border-solid border-gray-200">
          <div className="mt-[25px] flex flex-col items-center">
            <img
              src={data[0]?.profile_img_url}
              alt="defaultImg"
              className="h-[80px] w-[80px] rounded-full"
            />
            <h3 className="mt-[16px] h-[28px] text-lg font-semibold text-gray-900">
              {data[0]?.name}
            </h3>
            <span className="mt-[8px] text-sm text-gray-600">
              {data[0]?.email}
            </span>
            <span className="mt-[8px] text-xs text-gray-500">
              가입일 : {data[0]?.created_at?.slice(0, 4)}년{' '}
              {data[0]?.created_at?.slice(5, 7)}월{' '}
              {/* 추후 백엔드에서 어떤식으로 내려주는지 보고 1자리인 월인 경우는 수정이 필요함. 
          지금 설계한것은 01 이런식으로 월이 내려오는경우 */}
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
