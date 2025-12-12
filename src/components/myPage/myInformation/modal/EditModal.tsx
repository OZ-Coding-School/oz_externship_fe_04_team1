import closeIcon from '@/assets/icons/close.svg'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import useUserData from '@/hooks/quries/useUserData'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { EditUserInformation } from '@/types/editUserInformation'
import useS3PresignedUrl from '@/hooks/quries/useS3PresignedUrl'
import type { S3PresignedUrl } from '@/types/s3PresignedUrl'
interface EditModalProps {
  onClose: () => void
}
function EditModal({ onClose }: EditModalProps) {
  const [imgFile, setImgFile] = useState<File | null>(null)
  const { data: userData } = useUserData()
  // 추후 useEffect 이용해서 폼에 초기값 가져오는것 구현하기
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<EditUserInformation>({
    defaultValues: {
      name: userData[0]?.name,
      nickname: userData[0]?.nickname,
      birthday: userData[0]?.birthday.split('-').join(''),
      gender: userData[0]?.gender,
      profile_img_url: userData[0]?.profile_img_url,
    },
    mode: 'onBlur',
  })
  const onSubmit = (data: EditUserInformation) => {
    if (imgFile) {
      setValue('profile_img_url', s3UrlImgData.file_url)
    }
    console.log(getValues())
    // 추후에 api 연동시켜야함
  }
  const params = imgFile
    ? {
        type: 'USER_PROFILE_IMAGE',
        content_type: imgFile.type,
        file_name: imgFile.name,
        file_ext: imgFile.name.split('.').pop()!,
      }
    : undefined

  const { data: s3UrlImgData } = useS3PresignedUrl(params as S3PresignedUrl)
  const [editGender, setEditGender] = useState(userData[0]?.gender)
  const handleGender = (gender: 'M' | 'F') => {
    setEditGender(gender)
    setValue('gender', gender)
  }
  const nameRegister = {
    required: { value: true, message: '이름은 필수 항목입니다' },
    pattern: {
      value: /^[가-힣a-zA-Z]{2,8}$/,
      message: '2~8자의 한글/영문만 가능합니다',
    },
  }
  const nickNameRegister = {
    required: { value: true, message: '닉네임은 필수 항목입니다' },
    pattern: {
      value: /^[가-힣a-zA-Z0-9]{1,10}$/,
      message: '1~10자의 한글/영문/숫자만 가능합니다.',
    },
  }
  const birthDayRegister = {
    required: { value: true, message: '생년월일은 필수 항목입니다' },
    pattern: {
      value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
      message: '생년월일 8자리를 작성해주세요',
    },
  }
  return (
    <div
      className="bg-basic-white z-10 h-[600px] w-[450px] flex-col overflow-y-auto rounded-xl md:h-[730px] md:w-[512px]"
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex h-[89px] w-full items-center justify-between border-b-2 border-solid border-gray-200 px-6 py-7">
          <span className="text-lg font-semibold text-gray-900">
            프로필 수정
          </span>
          <img
            src={closeIcon}
            alt="colseIcon"
            onClick={onClose}
            className="h-[20px] w-[20px] cursor-pointer"
          />
        </div>
        {/* 사진~성별까지의 부분 */}
        <div className="mt-11 flex flex-col gap-3 border-b-2 border-solid border-gray-200 px-6 pb-10">
          {/* 프로필 사진 변경 부분 */}
          <label
            htmlFor="profile_img_url"
            className="text-primary-600 flex cursor-pointer flex-col items-center gap-4 text-sm"
          >
            <img
              src={
                imgFile ? s3UrlImgData?.file_url : userData[0]?.profile_img_url
              }
              alt="profileImg"
              className="h-[96px] w-[96px] rounded-full"
            />
            프로필 사진 변경
            <Input
              type="file"
              id="profile_img_url"
              className="hidden"
              {...register('profile_img_url')}
              accept="image/*"
              // 이미지만 첨부 가능하게
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                setImgFile(file)
              }}
            />
          </label>
          {/* 이름 부분*/}
          <label
            htmlFor="nameForm"
            className="flex flex-col gap-2 text-sm text-gray-900"
          >
            이름
            <Input {...register('name', nameRegister)} id="nameForm" />
            {errors.name && (
              <p className="text-danger-500 pl-1 text-xs">
                {errors.name.message}
              </p>
            )}
          </label>
          {/*닉네임 부분*/}
          <label className="flex flex-col gap-2 text-sm text-gray-900">
            닉네임
            <Input {...register('nickname', nickNameRegister)} />
            {errors.nickname && (
              <p className="text-danger-500 pl-1 text-xs">
                {errors.nickname.message}
              </p>
            )}
          </label>
          {/*생년월일*/}
          <label className="flex flex-col gap-2 text-sm text-gray-900">
            생년월일
            <Input {...register('birthday', birthDayRegister)} />
            {errors.birthday && (
              <p className="text-danger-500 pl-1 text-xs">
                {errors.birthday.message}
              </p>
            )}
            {/*api 명세서 상 생년월일이 2000-05-05 이런식으로 내려와서 피그마에서 요구한대로 구현*/}
            {/* 추후 변경하기 버튼 누를시 2000-05-05 형태로 변환 시키기 */}
          </label>
          {/*성별 부분*/}
          <div className="flex flex-col gap-2">
            성별
            <div className="flex gap-5">
              {/* 선택하면  */}
              <Button
                className={
                  editGender === 'M'
                    ? 'border-primary-600 bg-primary-100 text-primary-600 hover:text-basic-white w-[90px] cursor-pointer rounded-full border border-solid px-7 py-4'
                    : 'border-gray-250 hover:text-basic-white w-[90px] cursor-pointer rounded-full border border-solid bg-gray-200 px-8 py-4 text-gray-600'
                }
                onClick={() => handleGender('M')}
              >
                남
              </Button>
              <Button
                className={
                  editGender === 'F'
                    ? 'border-primary-600 bg-primary-100 text-primary-600 hover:text-basic-white w-[90px] cursor-pointer rounded-full border border-solid px-7 py-4'
                    : 'border-gray-250 hover:text-basic-white w-[90px] cursor-pointer rounded-full border border-solid bg-gray-200 px-8 py-4 text-gray-600'
                }
                onClick={() => handleGender('F')}
              >
                여
              </Button>
            </div>
          </div>
        </div>
        {/* 취소, 변경하기 버튼 */}
        <div className="mt-3 flex items-center justify-end gap-3 px-6 pb-4 md:pb-0">
          <button
            className="bg-basic-white cursor-pointer rounded-lg border-2 border-solid border-gray-300 px-6 py-2 text-base text-gray-900"
            type="button"
            onClick={onClose}
          >
            취소
          </button>
          <button className="bg-primary-500 text-basic-white text-bas cursor-pointer rounded-lg px-7 py-2">
            변경하기
          </button>
          {/* 변경하기 누르면 patch 로직 구현  + 토스트 ui*/}
        </div>
      </form>
    </div>
  )
}
export default EditModal
