import {
  FINDTYPE,
  StepIndicatorType,
  type FindPasswordFormData,
  type PasswordVerifyStepProps,
} from '@/types/findAccount'
import StepProgress from '../common/StepProgress'
import StepHeader from '../common/StepHeader'
import { useFormContext, useWatch } from 'react-hook-form'
import { MailCheck } from 'lucide-react'
import Input from '@/components/common/Input'
import Button from '@/components/common/Button'

function PasswordVerifyStep({
  currentStep,
  setCurrentStep,
  onVerifyCode,
}: PasswordVerifyStepProps) {
  const { getValues, register, setValue, handleSubmit } =
    useFormContext<FindPasswordFormData>()
  const email = getValues('email')
  const code = useWatch({ name: 'code' })

  const handleNextWithVerifyCode = (data: FindPasswordFormData) => {
    onVerifyCode({ email, code: data.code })
    setCurrentStep(StepIndicatorType.COMPLETE)
  }

  const handlePrev = () => {
    setCurrentStep(StepIndicatorType.AUTH)
  }

  const handleResendCode = () => {
    setValue('code', '')
    // api 호출로 인증코드 재전송
  }

  const codeRegister = register('code', {
    required: true,
    minLength: 6,
    maxLength: 6,
  })

  return (
    <div>
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_PASSWORD} />
      <StepHeader
        icon={MailCheck}
        title="이메일 인증"
        description={`${email}로 인증코드를 발송했습니다.`}
      />
      <form onSubmit={handleSubmit(handleNextWithVerifyCode)}>
        <div className="flex flex-col">
          <label htmlFor="code" className="pb-1 text-gray-700">
            인증코드
          </label>
          <div className="mb-5 flex gap-2">
            <Input
              id="code"
              className="w-full"
              placeholder="6자리 인증코드 입력"
              {...codeRegister}
            />
            <Button onClick={handleResendCode} className="verify-color">
              재전송
            </Button>
          </div>
        </div>
        <div className="flex flex-col">
          <Button
            type="submit"
            disabled={code.length !== 6}
            className="mt-2 h-12 cursor-pointer"
          >
            인증완료
          </Button>
        </div>
      </form>
      <Button onClick={handlePrev} className="mt-6 h-11" variant="outline">
        이전 단계
      </Button>
    </div>
  )
}

export default PasswordVerifyStep
