import StepHeader from '../common/StepHeader'
import StepProgress from '../common/StepProgress'
import { Phone } from 'lucide-react'
import {
  FINDTYPE,
  StepIndicatorType,
  type FindEmailFormData,
  type EmailVerifyStepProps,
} from '@/types/findAccount'
import { useFormContext, useWatch } from 'react-hook-form'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'
import { Timer } from '@/components/common/timer/Timer'
import { useEffect } from 'react'

function EmailVerifyStep({
  currentStep,
  setCurrentStep,
  onVerifyCode,
  onVerifyUserIdentity,
  timerRef,
}: EmailVerifyStepProps) {
  const { getValues, register, setValue, handleSubmit } =
    useFormContext<FindEmailFormData>()
  const phone = getValues('phone')
  const code = useWatch({ name: 'code' })
  const name = getValues('name')

  const handleVerifyCode = (data: FindEmailFormData) => {
    onVerifyCode({ phone_number: phone, code: data.code })
  }

  const handlePrev = () => {
    setCurrentStep(StepIndicatorType.AUTH)
  }

  const handleResendCode = () => {
    setValue('code', '')
    timerRef.current?.stop()
    onVerifyUserIdentity({ name, phone_number: phone })
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
    <div className="w-[90%]">
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_EMAIL} />
      <StepHeader
        icon={Phone}
        title="휴대폰 인증"
        description={`${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7, 11)}로 인증코드를 발송했습니다.`}
      />
      <form onSubmit={handleSubmit(handleVerifyCode)}>
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

export default EmailVerifyStep
