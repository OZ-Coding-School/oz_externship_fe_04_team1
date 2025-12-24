import { FINDTYPE, type EmailCompleteStepProps } from '@/types/findAccount'
import StepHeader from '../common/StepHeader'
import StepProgress from '../common/StepProgress'
import { Check } from 'lucide-react'
import Button from '@/components/common/Button'
import { useNavigate } from 'react-router'

function EmailCompleteStep({ currentStep, email }: EmailCompleteStepProps) {
  const navigate = useNavigate()
  return (
    <div className="w-[90%]">
      <StepProgress currentStep={currentStep} type={FINDTYPE.FIND_EMAIL} />
      <StepHeader
        icon={Check}
        title="이메일 찾기 완료"
        bgColorClass="bg-success-100"
        iconColorClass="text-success-600"
        description="입력하신 정보로 가입된 이메일을 찾았습니다."
      />
      <div className="mt-3 mb-20 flex justify-center rounded-lg border-1 border-gray-200 bg-gray-50 p-8">
        {email || ''}
      </div>
      <div className="flex h-[50px] justify-between gap-3">
        <button
          onClick={() => navigate('/login')}
          className="bg-success-500 hover:bg-success-600 w-full cursor-pointer rounded-lg text-white"
        >
          로그인하기
        </button>
        <Button
          onClick={() => navigate('/find-password')}
          variant="outline"
          className="w-full"
        >
          비밀번호 찾기
        </Button>
      </div>
    </div>
  )
}

export default EmailCompleteStep
