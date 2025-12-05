import useUserData from '@/hooks/quries/useUserData'
import Input from '@/components/common/Input'
import { useInformationModal } from '@/hooks/useInformationModal'

function EditUserInformation() {
  const { data } = useUserData()
  const { openModal } = useInformationModal()
  return (
    <div className="mb-8 w-full px-8">
      <div>
        <div className="flex flex-col items-center gap-4">
          <img
            src={data[0]?.profile_img_url}
            alt="profileImg"
            className="h-[128px] w-[128px] rounded-full"
          />
          <h3 className="text-lg font-semibold text-gray-900">프로필 이미지</h3>
        </div>
        <div className="mx-auto mt-8 flex flex-col gap-6">
          <div className="flex gap-8">
            <div className="flex w-1/2 flex-col gap-2">
              <span className="text-sm text-gray-700">이메일</span>
              <Input
                placeholder={data[0]?.email}
                disabled
                className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
              />
            </div>
            <div className="flex w-1/2 flex-col gap-2">
              <span className="text-sm text-gray-700">이름</span>
              <Input
                placeholder={data[0]?.name}
                disabled
                className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
              />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex w-1/2 flex-col gap-2">
              <span className="text-sm text-gray-700">닉네임</span>
              <Input
                placeholder={data[0]?.nickname}
                disabled
                className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
              />
            </div>
            <div className="flex w-1/2 flex-col gap-2">
              <span className="text-sm text-gray-700">생년월일</span>
              <Input
                placeholder={data[0]?.birthday}
                disabled
                className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
              />
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex w-1/2 flex-col gap-2">
              <span className="text-sm text-gray-700">휴대폰 번호</span>
              <div className="flex gap-4">
                <Input
                  placeholder={data[0]?.phone_number.replace(
                    /(\d{3})(\d{4})(\d{4})/,
                    '$1-$2-$3'
                  )}
                  disabled
                  className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
                />
                <button
                  className="bg-primary-500 text-basic-white h-[40px] w-[84px] cursor-pointer rounded-lg text-base font-medium"
                  onClick={() => openModal('editPhoneNumberModal')}
                >
                  변경
                </button>
              </div>
            </div>
            <div className="flex w-1/2 flex-col gap-2">
              <span className="text-sm text-gray-700">성별</span>
              <Input
                placeholder={data[0]?.gender === 'M' ? '남자' : '여자'}
                disabled
                className="!opacity-100 placeholder:font-medium placeholder:text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EditUserInformation
