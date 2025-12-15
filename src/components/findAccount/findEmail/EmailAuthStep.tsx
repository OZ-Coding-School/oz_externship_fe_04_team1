import {
  FINDTYPE,
  StepIndicatorType,
  type EmailAuthStepProps,
  type FindEmailFormData,
} from '@/types/findAccount'
import { UserRoundSearch } from 'lucide-react'
import StepProgress from '../common/StepProgress'
import StepHeader from '../common/StepHeader'
import Input from '@/components/common/Input'
import { useFormContext } from 'react-hook-form'
import { ROUTE_PATHS } from '@/constant/route'
import { Link } from 'react-router'
import Button from '@/components/common/Button'

function EmailAuthStep({
  currentStep,
  setCurrentStep,
  onVerifyUserIdentity,
}: EmailAuthStepProps) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useFormContext<FindEmailFormData>()

  const nameRegister = register('name', {
    required: true,
    pattern: {
      value: /^[가-힣a-zA-Z]{2,8}$/,
      message: '2~8자의 한글/영문만 가능합니다.',
    },
  })

  const phoneRegister = register('phone', {
    required: true,
    pattern: {
      value: /^[0-9]{11}$/,
      message: '휴대폰 번호를 11자리 숫자로 입력해주세요.',
    },
  })

  const handleVerifyUserIdentity = (data: FindEmailFormData) => {
    onVerifyUserIdentity({ name: data.name, phone_number: data.phone })
    setCurrentStep(StepIndicatorType.VERIFY)
  }

  return (
    <div>
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_EMAIL} />
      <StepHeader
        icon={UserRoundSearch}
        title="회원 정보 입력"
        description="가입 시 입력한 이름과 휴대폰번호를 입력해주세요"
      />
      <form
        onSubmit={handleSubmit(handleVerifyUserIdentity)}
        className="flex flex-col pt-5"
      >
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
            <p className="pt-1 text-sm text-red-500">{errors.name.message}</p>
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
          {errors.phone?.message && (
            <p className="pt-1 text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>
        <Button
          type="submit"
          disabled={!isValid}
          className="h-12 cursor-pointer"
        >
          인증 코드 전송
        </Button>
      </form>
      <Link
        className="text-primary-600 flex justify-center pt-6 text-sm"
        to={ROUTE_PATHS.LOGIN}
      >
        로그인으로 돌아가기
      </Link>
    </div>
  )
}

export default EmailAuthStep
