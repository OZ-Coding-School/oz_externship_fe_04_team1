import Input from '@/components/common/Input'
import useUserData from '@/hooks/quries/useUserData'

function MobileUserForm() {
  const { data } = useUserData()
  return (
    <div className="mt-8 flex flex-col gap-3">
      <div className="flex w-full gap-3">
        <div className="flex w-1/2 flex-col gap-1">
          <span className="text-sm text-gray-700">이메일</span>
          <Input
            placeholder={data[0]?.email}
            disabled
            className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
          />
        </div>
        <div className="flex w-1/2 flex-col gap-1">
          <span className="text-sm text-gray-700">성별</span>
          <Input
            placeholder={data[0]?.gender === 'M' ? '남성' : '여성'}
            disabled
            className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
          />
        </div>
      </div>
      <div className="flex w-full flex-col gap-1">
        <span className="text-sm text-gray-700">생년월일</span>
        <Input
          placeholder={data[0]?.birthday}
          disabled
          className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-sm text-gray-700">휴대폰 번호</span>
        <div className="flex gap-3">
          <div className="w-4/5">
            <Input
              placeholder={data[0]?.phone_number.replace(
                /(\d{3})(\d{4})(\d{4})/,
                '$1-$2-$3'
              )}
              disabled
              className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
            />
          </div>
          <button className="text-basic-white bg-primary-500 py-2.3 cursor-pointer rounded-lg px-4 text-sm whitespace-nowrap">
            변경
          </button>
        </div>
      </div>
    </div>
  )
}
export default MobileUserForm
