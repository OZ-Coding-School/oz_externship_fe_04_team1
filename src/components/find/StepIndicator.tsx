import { useState } from 'react'
import AuthStep from './AuthStep'
import CompleteStep from './CompleteStep'
import VerifyStep from './VerifyStep'
import { StepIndicatorType, type StepIndicatorProps } from '@/types/findAccount'

function StepIndicator({ title, subTitle, type }: StepIndicatorProps) {
  const [step, setStep] = useState<StepIndicatorType>(StepIndicatorType.AUTH)

  const renderStep = () => {
    switch (step) {
      case StepIndicatorType.AUTH:
        return <AuthStep type={type} currentStep={step} setStep={setStep} />
      case StepIndicatorType.VERIFY:
        return <VerifyStep type={type} currentStep={step} setStep={setStep} />
      case StepIndicatorType.COMPLETE:
        return <CompleteStep type={type} currentStep={step} />
      default:
        return null
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center justify-center gap-8 bg-gray-50 pt-20 pb-30">
      <div className="flex flex-col items-center">
        <h2 className="text-3xl font-semibold text-gray-900">{title}</h2>
        <p className="pt-2 text-sm font-normal text-gray-600">{subTitle}</p>
      </div>
      <div className="flex h-fit w-[460px] flex-col items-center bg-white pt-8 pb-7 shadow-xs">
        {renderStep()}
      </div>
    </div>
  )
}

export default StepIndicator
