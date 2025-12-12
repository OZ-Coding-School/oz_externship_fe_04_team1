import {
  FINDTYPE,
  StepIndicatorType,
  type AuthStepProps,
} from '@/types/findAccount'
import StepProgress from './StepProgress'
import { UserRoundSearch, LockOpen } from 'lucide-react'
import Input from '../common/Input'
import Button from '../common/Button'
import { Link } from 'react-router'
import { ROUTE_PATHS } from '@/constant/route'
import { useFormContext, useWatch } from 'react-hook-form'
import type { FindAccountFormData } from './StepIndicator'

function AuthStep({ type, currentStep, setStep }: AuthStepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<FindAccountFormData>()

  const isEmailFinding = type === FINDTYPE.FIND_EMAIL

  const name = useWatch({ name: 'name' })
  const phoneNumber = useWatch({ name: 'phoneNumber' })
  const email = useWatch({ name: 'email' })

  const isValid = isEmailFinding
    ? !!name && !!phoneNumber && !errors.name && !errors.phoneNumber
    : !!email && !errors.email

  const emailRegister = register('email', {
    required: true,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  })

  const nameRegister = register('name', {
    required: true,
    pattern: {
      value: /^[가-힣a-zA-Z]{2,8}$/,
      message: '2~8자의 한글/영문만 가능합니다.',
    },
  })

  const phoneRegister = register('phoneNumber', {
    required: true,
    pattern: {
      value: /^[0-9]{11}$/,
      message: '휴대폰 번호를 11자리 숫자로 입력해주세요.',
    },
  })

  const handleNext = () => {
    setStep(StepIndicatorType.VERIFY)
  }

  const AUTH_CONTENT = {
    [FINDTYPE.FIND_EMAIL]: {
      icon: UserRoundSearch,
      title: '회원 정보 입력',
      description: '가입 시 입력한 이름과 휴대폰번호를 입력해주세요',
    },
    [FINDTYPE.FIND_PASSWORD]: {
      icon: LockOpen,
      title: '이메일 입력',
      description: '가입하신 이메일을 입력하면 인증코드를 보내드립니다',
    },
  }

  const { icon: Icon, title, description } = AUTH_CONTENT[type]

  return (
    <div className="flex flex-col">
      <StepProgress type={type} currentStep={currentStep} />
      <div className="mt-4 flex flex-col items-center justify-center">
        <div className="bg-primary-100 mb-3 flex size-15 items-center justify-center rounded-full">
          <Icon className="text-primary-600" size={24} />
        </div>
        <h3 className="mb-2 text-lg font-semibold">{title}</h3>
        <p className="pb-6 text-sm text-gray-600">{description}</p>
      </div>
      <div className="flex flex-col pt-5">
        {isEmailFinding ? (
          <>
            <label htmlFor="name" className="pb-1 text-gray-700">
              이름
            </label>
            <div className="mb-6">
              <Input
                id="name"
                className="w-full"
                placeholder="실명을 입력해주세요"
                {...nameRegister}
              />
              {errors.name?.message && (
                <p className="pt-1 text-sm text-red-500">
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className="mb-6">
              <label htmlFor="tel" className="pb-1 text-gray-700">
                휴대전화
              </label>
              <Input
                id="tel"
                className="w-full"
                placeholder="01012345678"
                {...phoneRegister}
              />
              {errors.phoneNumber?.message && (
                <p className="pt-1 text-sm text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </>
        ) : (
          <>
            <label htmlFor="email" className="pb-1 text-gray-700">
              이메일
            </label>
            <div className="mb-6">
              <Input
                id="email"
                className="w-full"
                placeholder="example@email.com"
                {...emailRegister}
              />
              {errors.email?.message && (
                <p className="pt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </>
        )}
        <Button
          disabled={!isValid}
          onClick={handleNext}
          className="h-12 cursor-pointer"
        >
          인증 코드 전송
        </Button>
      </div>
      <Link
        className="text-primary-600 flex justify-center pt-6 text-sm"
        to={ROUTE_PATHS.LOGIN}
      >
        로그인으로 돌아가기
      </Link>
    </div>
  )
}

export default AuthStep
