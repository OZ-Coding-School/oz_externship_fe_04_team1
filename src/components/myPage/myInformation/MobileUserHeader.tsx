import useUserData from '@/hooks/quries/useUserData'

function MobileUserHeader() {
  const { data: userData } = useUserData()
  return (
    // 이미지, 이름, 이메일 나타내줌
    <div className="flex flex-col items-center">
      <img
        src={userData[0]?.profile_img_url}
        alt="profileImg"
        className="h-[80px] w-[80px] rounded-full"
      />
      <div className="mt-3 flex flex-col items-center">
        <span className="text-lg font-semibold text-gray-900">
          {userData[0]?.name}
        </span>
        <span className="text-sm text-gray-600">{userData[0]?.email}</span>
      </div>
    </div>
  )
}
export default MobileUserHeader
