import FindAccountLayout from '@/components/find/common/FindAccountLayout'
import PasswordAuthStep from '@/components/find/findPassword/PasswordAuthStep'
import PasswordCompleteStep from '@/components/find/findPassword/PasswordComplete'
import PasswordVerifyStep from '@/components/find/findPassword/PasswordVerifyStep'
import {
  StepIndicatorType,
  type FindPasswordFormData,
  type ReqResetPassword,
} from '@/types/findAccount'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

function FindPasswordPage() {
  const [currentStep, setCurrentStep] = useState(StepIndicatorType.AUTH)
  const methods = useForm<FindPasswordFormData>({ mode: 'onChange' })

  const handleResetPassword = (password: ReqResetPassword) => {
    // api 작업
  }
  return (
    <FormProvider {...methods}>
      <FindAccountLayout
        title="비밀번호 찾기"
        subTitle="가입하신 이메일을 입력하면 인증코드를 보내드립니다."
      >
        {currentStep === StepIndicatorType.AUTH && (
          <PasswordAuthStep
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === StepIndicatorType.VERIFY && (
          <PasswordVerifyStep
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === StepIndicatorType.COMPLETE && (
          <PasswordCompleteStep
            onResetPassword={handleResetPassword}
            currentStep={currentStep}
          />
        )}
      </FindAccountLayout>
    </FormProvider>
  )
}

export default FindPasswordPage
