import Button from '@/components/common/Button'
import BasicInfoSection from '@/components/signup/BasicInfoSection'
import EmailVerificationSection from '@/components/signup/EmailVerificationSection'
import PasswordSection from '@/components/signup/PasswordSection'
import PhoneVerificationSection from '@/components/signup/PhoneVerificationSection'
import type { SignupFormValues } from '@/types/signup'
import { FormProvider, useForm, type FieldErrors } from 'react-hook-form'
import { Link } from 'react-router'

// useForm() 한번 생성
// FormProvider로 하위 컴포넌트들에 전파
// 제출처리 ( handleSubmit)

function SignupPage() {
  const methods = useForm<SignupFormValues>({
    mode: 'onBlur',
    reValidateMode: 'onChange', // onSubmit을 해야 적용되는 것
    defaultValues: {
      name: '',
      nickname: '',
      birthday: '',
      gender: '',
      email: '',
      phone_number: '',
      password: '',
      password_confirm: '',
    },
  })

  // 제출 버튼 클릭 시 오류가 난 첫번째 인풋으로 포커스
  const onError = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors)[0]
    methods.setFocus(firstErrorField as keyof SignupFormValues)
  }

  const handleSubmit = (data: SignupFormValues) => {
    // password_confirm 제거
    const { password_confirm, ...signupData } = data
    console.log(signupData) // singupData만 api로 Post
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-gray-50">
      {/* 회원가입 폼 */}
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(handleSubmit, onError)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.preventDefault()
          }}
          className="my-14 flex h-fit w-[528px] flex-col gap-9 bg-white px-5 py-10"
        >
          {/* 헤더 */}
          <div className="flex flex-col items-center justify-center gap-4">
            <h2 className="text-3xl font-bold">회원가입</h2>
            <p className="text-sm text-gray-600">
              이미 계정이 있으신가요?
              <Link className="text-primary-600 pl-3" to={'/login'}>
                로그인하기
              </Link>
            </p>
          </div>
          {/* 기본적인 정보 입력 (이름, 닉네임, 생년월일, 성별) */}
          <BasicInfoSection />

          {/* 이메일 입력 */}
          <EmailVerificationSection />

          {/* 휴대전화 입력 */}
          <PhoneVerificationSection />

          {/* 비밀번호 입력 */}
          <PasswordSection />
          <Button type="submit" className="h-[52px] w-full">
            가입하기
          </Button>
        </form>
      </FormProvider>
    </div>
  )
}
export default SignupPage
