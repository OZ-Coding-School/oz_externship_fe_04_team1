import {
  FINDTYPE,
  type FindPasswordFormData,
  type PasswordAuthStepProps,
} from '@/types/findAccount'
import StepProgress from '../common/StepProgress'
import StepHeader from '../common/StepHeader'
import Input from '@/components/common/Input'
import { LockOpen } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import Button from '@/components/common/Button'
import { Link } from 'react-router'
import { ROUTE_PATHS } from '@/constant/route'

function PasswordAuthStep({
  currentStep,
  onVerifyWithEmail,
}: PasswordAuthStepProps) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useFormContext<FindPasswordFormData>()

  const emailRegister = register('email', {
    required: true,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '올바른 이메일 형식이 아닙니다.',
    },
  })

  const handleNextWithVerifyEmail = (data: FindPasswordFormData) => {
    onVerifyWithEmail({ email: data.email })
  }

  return (
    <div className="w-[90%]">
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_PASSWORD} />
      <StepHeader
        icon={LockOpen}
        title="이메일 입력"
        description="가입하신 이메일을 입력하면 인증코드를 보내드립니다"
      />
      <form onSubmit={handleSubmit(handleNextWithVerifyEmail)}>
        <div className="flex flex-col pt-5">
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

          <Button
            type="submit"
            disabled={!isValid}
            className="h-12 cursor-pointer"
          >
            인증 코드 전송
          </Button>
        </div>
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

export default PasswordAuthStep
