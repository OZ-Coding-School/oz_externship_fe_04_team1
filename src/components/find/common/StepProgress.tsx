import { FINDTYPE, type StepIndicatorType } from '@/types/findAccount'

const STEP_TEXTS = {
  [FINDTYPE.FIND_EMAIL]: ['정보 입력', '휴대폰 인증', '결과확인'],
  [FINDTYPE.FIND_PASSWORD]: ['이메일 입력', '이메일 인증', '비밀번호 재설정'],
}

type StepProgressProps = {
  type: FINDTYPE
  currentStep: StepIndicatorType
}

function StepProgress({ type, currentStep }: StepProgressProps) {
  // 단계 표시 UI
  return (
    <div className="mx-auto flex">
      {STEP_TEXTS[type].map((text, index) => (
        <div key={index} className="flex items-center">
          <div
            key={index}
            className="flex w-[80px] flex-col items-center justify-center"
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full text-base ${
                currentStep === 3
                  ? 'bg-success-500 text-white'
                  : index + 1 <= currentStep
                    ? 'bg-primary-500 text-white'
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {index + 1}
            </span>
            <p className="pt-1 text-xs text-gray-500">{text}</p>
          </div>
          {index < 2 && (
            <div
              className={`mb-2 h-1 w-[75px] rounded-full ${
                currentStep === 3
                  ? 'bg-success-500'
                  : index + 1 < currentStep
                    ? 'bg-primary-500'
                    : 'bg-gray-200'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}

export default StepProgress
