import type { SignupFormValues } from '@/types/signup'
import Button from '../common/Button'
import Input from '../common/Input'
import FormField from './FormField'
import { useFormContext, useWatch } from 'react-hook-form'
import { useCheckNickname } from '@/hooks/quries/auth/useSignup'
import { useState } from 'react'

function BasicInfoSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupFormValues>()
  const nickname = useWatch({ name: 'nickname' })
  const gender = useWatch({ name: 'gender' })
  const { mutate: checkNickname, isPending: isCheckingNickname } =
    useCheckNickname()
  const [isNicknameAvailable, setIsNicknameAvailable] = useState<
    boolean | null
  >(null)

  const nameRegister = register('name', {
    required: '이름을 입력해주세요',
    pattern: {
      value: /^[가-힣a-zA-Z]{2,8}$/,
      message: '2~8자의 한글/영문만 가능합니다.',
    },
  })

  const nicknameRegister = register('nickname', {
    required: '닉네임을 입력해주세요',
    pattern: {
      value: /^[가-힣a-zA-Z0-9]{1,10}$/,
      message: '1~10자의 한글/영문/숫자만 가능합니다.',
    },
    onChange: () => setIsNicknameAvailable(null),
  })

  const birthdayRegister = register('birthday', {
    required: '생년월일을 8자리를 입력해주세요',
    pattern: {
      value: /^(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])$/,
      message: '생년월일 8자리를 입력해주세요',
    },
  })

  const genderRegister = register('gender', {
    required: '성별을 선택해주세요',
  })

  const handleCheckNickname = (nickname: string) => {
    if (errors.nickname) return
    checkNickname(
      { nickname },
      {
        onSuccess: () => {
          // 닉네임 사용 가능
          setIsNicknameAvailable(true)
        },
        // 이미 사용중인 닉네임
        onError: () => setIsNicknameAvailable(false),
      }
    )
  }

  return (
    <div className="flex flex-col gap-11">
      {/* 이름 */}
      <FormField
        htmlFor="name"
        require
        label="이름"
        errorMsg={errors.name?.message as string}
      >
        <Input
          {...nameRegister}
          id="name"
          autoComplete="name"
          className="h-12"
          placeholder="이름을 입력해주세요"
          error={!!errors.name}
        />
      </FormField>

      {/* 닉네임 */}
      <FormField
        htmlFor="nickname"
        require
        label="닉네임"
        errorMsg={errors.nickname?.message}
      >
        <div className="flex justify-center gap-3">
          <Input
            {...nicknameRegister}
            className="h-12 flex-1"
            id="nickname"
            autoComplete="off"
            error={!!errors.nickname}
            placeholder="닉네임을 입력해주세요"
          />
          <Button
            disabled={!nickname || !!errors.nickname}
            className={`w-[112px] text-base ${nickname ? 'verify-color hover:verify-color' : 'before-verify-color opacity-60'}`}
            onClick={() => handleCheckNickname(nickname)}
          >
            중복 확인
          </Button>
        </div>
        {!errors.nickname && isNicknameAvailable !== null && (
          <p
            className={`pt-2 pl-1 text-sm ${isNicknameAvailable ? 'text-success-600' : 'text-danger-500'}`}
          >
            {isNicknameAvailable
              ? '사용가능한 닉네임입니다.'
              : '이미 존재하는 닉네임입니다.'}
          </p>
        )}
      </FormField>

      {/* 생년월일 */}
      <FormField
        htmlFor="birth"
        label="생년월일"
        require
        errorMsg={errors.birthday?.message}
      >
        <Input
          {...birthdayRegister}
          className="h-12"
          id="birth"
          autoComplete="bday"
          error={!!errors.birthday}
          placeholder="8자리 입력해주세요 (ex.20000101)"
        />
      </FormField>

      {/* 성별 */}
      <div className="flex flex-col gap-5">
        <div>
          성별
          <span className="text-danger-500 pl-0.5">*</span>
        </div>
        <div>
          <div className="flex gap-5">
            {/* 남 */}
            <label
              htmlFor="gender-m"
              className={`flex cursor-pointer items-center justify-center rounded-full ${gender === 'M' ? 'gender-click-color' : 'before-gender-click-color'}`}
            >
              <input
                id="gender-m"
                type="radio"
                value="M"
                {...genderRegister}
                className="sr-only"
              />
              남
            </label>

            {/* 여 */}
            <label
              htmlFor="gender-f"
              className={`flex cursor-pointer items-center justify-center rounded-full ${gender === 'F' ? 'gender-click-color' : 'before-gender-click-color'}`}
            >
              <input
                id="gender-f"
                type="radio"
                value="F"
                {...genderRegister}
                className="sr-only"
              />
              여
            </label>
          </div>
          {errors.gender && (
            <p className="text-danger-500 pt-2 pl-1 text-sm">
              {errors.gender.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default BasicInfoSection
