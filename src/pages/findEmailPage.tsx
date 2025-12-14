import FindAccountLayout from '@/components/find/common/FindAccountLayout'
import EmailCompleteStep from '@/components/find/findEmail/EmailCompleteStep'
import EmailAuthStep from '@/components/find/findEmail/EmailAuthStep'
import EmailVerifyStep from '@/components/find/findEmail/EmailVerifyStep'
import {
  StepIndicatorType,
  type FindEmailFormData,
  type ReqVerifyPhoneCode,
} from '@/types/findAccount'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

function FindEmailPage() {
  const [currentStep, setCurrentStep] = useState(StepIndicatorType.AUTH)
  const methods = useForm<FindEmailFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      phone: '',
      code: '',
    },
  })

  const handleVerifyCode = (data: ReqVerifyPhoneCode) => {
    // api 작업 - phone과 code를 서버로 전송하여 인증번호 검증
    console.log('data: ', data)
  }

  return (
    <FormProvider {...methods}>
      <FindAccountLayout
        title="이메일 찾기"
        subTitle="가입시 입력한 정보로 이메일을 찾을 수 있습니다."
      >
        {currentStep === StepIndicatorType.AUTH && (
          <EmailAuthStep
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        )}
        {currentStep === StepIndicatorType.VERIFY && (
          <EmailVerifyStep
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            onVerifyCode={handleVerifyCode}
          />
        )}
        {currentStep === StepIndicatorType.COMPLETE && (
          <EmailCompleteStep currentStep={currentStep} />
        )}
      </FindAccountLayout>
    </FormProvider>
  )
}

export default FindEmailPage
