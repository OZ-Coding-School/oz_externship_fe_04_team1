import FindAccountLayout from '@/components/find/common/FindAccountLayout'
import PasswordAuthStep from '@/components/find/findPassword/PasswordAuthStep'
import PasswordCompleteStep from '@/components/find/findPassword/PasswordComplete'
import PasswordVerifyStep from '@/components/find/findPassword/PasswordVerifyStep'
import {
  StepIndicatorType,
  type FindPasswordFormData,
  type ReqVerifyEmailCode,
  type ReqResetPassword,
} from '@/types/findAccount'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

function FindPasswordPage() {
  const [currentStep, setCurrentStep] = useState(StepIndicatorType.AUTH)
  const methods = useForm<FindPasswordFormData>({
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
      password: '',
      password_confirm: '',
    },
  })

  const handleVerifyCode = (data: ReqVerifyEmailCode) => {
    // api 작업: email과 code를 서버로 전송하여 인증번호 검증
    console.log('Verify Code:', data)
  }

  const handleResetPassword = (data: ReqResetPassword) => {
    // api 작업 - email과 새 password를 서버로 전송하여 비밀번호 재설정
    console.log('Reset Password:', data)
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
            onVerifyCode={handleVerifyCode}
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
