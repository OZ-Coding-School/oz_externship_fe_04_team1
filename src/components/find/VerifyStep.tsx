import { useState, type Dispatch, type SetStateAction } from 'react'
import { FINDTYPE, StepIndicatorType } from '@/types/findAccount'
import StepProgress from './StepProgress'
import { Phone, MailCheck } from 'lucide-react'
import Button from '../common/Button'
import Input from '../common/Input'
import { useFormContext } from 'react-hook-form'

type VerifyStepProps = {
  type: FINDTYPE
  currentStep: StepIndicatorType
  setStep: Dispatch<SetStateAction<StepIndicatorType>>
}

function VerifyStep({ type, currentStep, setStep }: VerifyStepProps) {
  const [code, setCode] = useState('')
  const { getValues } = useFormContext()

  const phoneNumber = getValues('phoneNumber')
  const email = getValues('email')

  const VERIFY_CONTENT = {
    [FINDTYPE.FIND_EMAIL]: {
      icon: Phone,
      title: '휴대폰 인증',
      description: `${phoneNumber}로 인증코드를 발송했습니다.`,
    },
    [FINDTYPE.FIND_PASSWORD]: {
      icon: MailCheck,
      title: '이메일 인증',
      description: `${email}로 인증코드를 발송했습니다.`,
    },
  }

  const { icon: Icon, title, description } = VERIFY_CONTENT[type]

  const handleNext = () => {
    // 인증 api 호출
    setStep(StepIndicatorType.COMPLETE)
  }

  const handlePrev = () => {
    setStep(StepIndicatorType.AUTH)
  }

  const handleResend = () => {
    setCode('')
    // api 호출로 인증코드 재전송
  }

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

      <Button
        onClick={handleNext}
        disabled={code.length !== 6}
        className="h-12 cursor-pointer"
      >
        인증완료
      </Button>
      <Button onClick={handlePrev} className="mt-6" variant="outline">
        이전 단계
      </Button>
    </div>
  )
}

export default VerifyStep
