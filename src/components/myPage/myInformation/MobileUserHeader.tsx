import useUserData from '@/hooks/quries/useUserData'
import defaultImg from '@/assets/images/defaultProfileImg.svg'
function MobileUserHeader() {
  const { data: userData } = useUserData()
  return (
    // 이미지, 이름, 이메일 나타내줌
    <div className="flex flex-col items-center">
      <img
        src={userData?.profile_img_url || defaultImg}
        alt="profileImg"
        className="h-[80px] w-[80px] rounded-full"
        // onError={(e) => (e.currentTarget.src = defaultImg)}
        // 대체 이미지 추가하기
      />
      <div className="mt-3 flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-900">
          {userData?.name}
        </span>
        <span className="text-sm text-gray-600">{userData?.email}</span>
      </div>
    </div>
  )
}
export default MobileUserHeader
