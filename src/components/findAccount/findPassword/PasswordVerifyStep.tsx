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
import { Timer } from '@/components/common/timer/Timer'
import { useEffect } from 'react'

function PasswordVerifyStep({
  currentStep,
  setCurrentStep,
  onVerifyCode,
  onVerifyWithEmail,
  timerRef,
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
    onVerifyWithEmail({ email })
  }

  const codeRegister = register('code', {
    required: true,
    minLength: 6,
    maxLength: 6,
  })

  useEffect(() => {
    timerRef.current?.start()
  }, [timerRef])

  return (
    <div>
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_PASSWORD} />
      <StepHeader
        icon={MailCheck}
        title="이메일 인증"
        description={`${email}로 인증코드를 발송했습니다.`}
      />
      <form onSubmit={handleSubmit(handleNextWithVerifyCode)}>
        <div className="mb-5 flex flex-col">
          <label htmlFor="code" className="pb-1 text-gray-700">
            인증코드
          </label>
          <div className="flex gap-2">
            <div className="relative w-full">
              <Input
                id="code"
                className="w-full"
                placeholder="6자리 인증코드 입력"
                {...codeRegister}
              />
              <Timer ref={timerRef} />
            </div>

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
      <Button
        onClick={handlePrev}
        className="mt-6 h-11 w-full"
        variant="outline"
      >
        이전 단계
      </Button>
    </div>
  )
}

export default PasswordVerifyStep
