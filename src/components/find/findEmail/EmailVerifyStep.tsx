import { useState, type Dispatch, type SetStateAction } from 'react'
import StepHeader from '../common/StepHeader'
import StepProgress from '../common/StepProgress'
import { Phone } from 'lucide-react'
import { FINDTYPE, StepIndicatorType } from '@/types/findAccount'
import { useFormContext } from 'react-hook-form'
import Button from '@/components/common/Button'
import Input from '@/components/common/Input'

type EmailVerifyStepProps = {
  currentStep: StepIndicatorType
  setCurrentStep: Dispatch<SetStateAction<StepIndicatorType>>
}

function EmailVerifyStep({
  currentStep,
  setCurrentStep,
}: EmailVerifyStepProps) {
  const { getValues } = useFormContext()
  const phone = getValues('phone')
  const [code, setCode] = useState('')

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
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_EMAIL} />
      <StepHeader
        icon={Phone}
        title="회원 정보 입력"
        description={`${phone}로 인증코드를 발송했습니다.`}
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

export default EmailVerifyStep
