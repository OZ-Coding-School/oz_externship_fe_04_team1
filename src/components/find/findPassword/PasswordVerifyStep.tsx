import {
  FINDTYPE,
  StepIndicatorType,
  type StepControlProps,
} from '@/types/findAccount'
import StepProgress from '../common/StepProgress'
import StepHeader from '../common/StepHeader'
import { useFormContext } from 'react-hook-form'
import { MailCheck } from 'lucide-react'
import Input from '@/components/common/Input'
import { useState } from 'react'
import Button from '@/components/common/Button'

function PasswordVerifyStep({ currentStep, setCurrentStep }: StepControlProps) {
  const [code, setCode] = useState('')
  const { getValues } = useFormContext()
  const email = getValues('email')

  const handleNext = () => {
    // 인증 api 호출
    setCurrentStep(StepIndicatorType.COMPLETE)
  }

  const handlePrev = () => {
    setCurrentStep(StepIndicatorType.AUTH)
  }

  const handleResend = () => {
    setCode('')
    // api 호출로 인증코드 재전송
  }

  return (
    <div>
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_PASSWORD} />
      <StepHeader
        icon={MailCheck}
        title="이메일 인증"
        description={`${email}로 인증코드를 발송했습니다.`}
      />
      <div className="flex flex-col">
        <label htmlFor="code" className="pb-1 text-gray-700">
          인증코드
        </label>
        <div className="mb-5 flex gap-2">
          <Input
            id="code"
            className="w-full"
            placeholder="6자리 인증코드 입력"
            value={code}
            onChange={(e) => setCode(e.target.value)}
          />
          <Button onClick={handleResend} className="verify-color">
            재전송
          </Button>
        </div>
      </div>
      <div className="flex flex-col">
        <Button
          onClick={handleNext}
          disabled={code.length !== 6}
          className="mt-2 h-12 cursor-pointer"
        >
          인증완료
        </Button>
        <Button onClick={handlePrev} className="mt-6 h-11" variant="outline">
          이전 단계
        </Button>
      </div>
    </div>
  )
}

export default PasswordVerifyStep
