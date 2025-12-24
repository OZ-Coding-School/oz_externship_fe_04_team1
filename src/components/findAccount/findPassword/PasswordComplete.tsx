import {
  FINDTYPE,
  type FindPasswordFormData,
  type PasswordCompleteStepProps,
} from '@/types/findAccount'
import StepProgress from '../common/StepProgress'
import StepHeader from '../common/StepHeader'
import { KeyRound } from 'lucide-react'
import Input from '@/components/common/Input'
import { useFormContext, useWatch } from 'react-hook-form'

function PasswordCompleteStep({
  currentStep,
  onResetPassword,
}: PasswordCompleteStepProps) {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    getValues,
  } = useFormContext<FindPasswordFormData>()
  const password = useWatch({ name: 'password', defaultValue: '' })

  const passwordRegister = register('password', {
    required: true,
    pattern: {
      value:
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+[\]{};':"\\|,.<>/?-]).{8,15}$/,
      message: '8~15자, 대소문자+숫자+특수문자 포함 해주세요',
    },
  })

  const passwordConfirmRegister = register('password_confirm', {
    required: true,
    validate: (value) => value === password || '비밀번호가 일치하지 않습니다.',
  })

  const handleResetPassword = (data: FindPasswordFormData) => {
    const email = getValues('email')
    onResetPassword({ email, new_password: data.password })
  }

  return (
    <div className="w-[90%]">
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_PASSWORD} />
      <StepHeader
        icon={KeyRound}
        title="비밀번호 재설정"
        bgColorClass="bg-success-100"
        iconColorClass="text-success-600"
        description="새로운 비밀번호를 입력해주세요"
      />
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className="flex flex-col gap-6"
      >
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-gray-700">
            새 비밀번호
          </label>
          <Input
            id="password"
            type="password"
            autoComplete="new-password"
            className="w-full"
            placeholder="8자 이상 입력해주세요"
            {...passwordRegister}
          />
          {errors.password?.message && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="password_confirm" className="text-gray-700">
            비밀번호 확인
          </label>
          <Input
            id="password_confirm"
            type="password"
            className="w-full"
            autoComplete="new-password"
            placeholder="새 비밀번호를 다시 입력해주세요"
            {...passwordConfirmRegister}
          />
          {errors.password_confirm?.message && (
            <p className="text-sm text-red-500">
              {errors.password_confirm.message}
            </p>
          )}
        </div>
        <button
          disabled={!isValid}
          className="bg-success-500 hover:bg-success-600 h-12 cursor-pointer rounded-lg text-white disabled:cursor-not-allowed"
        >
          비밀번호 변경 완료
        </button>
      </form>
    </div>
  )
}

export default PasswordCompleteStep
