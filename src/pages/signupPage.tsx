import Button from '@/components/common/Button'
import BasicInfoSection from '@/components/signup/BasicInfoSection'
import EmailVerificationSection from '@/components/signup/EmailVerificationSection'
import PasswordSection from '@/components/signup/PasswordSection'
import PhoneVerificationSection from '@/components/signup/PhoneVerificationSection'
import { FormProvider, useForm } from 'react-hook-form'
import { Link } from 'react-router'

// useForm() 한번 생성
// FormProvider로 하위 컴포넌트들에 전파
// 제출처리 ( handleSubmit)

function SignupPage() {
  const methods = useForm()
  console.log(methods)
  return (
    // 여기서 페이지의 전체적인 레이아웃 적용해야함 (의문: min-h-screen은 100vh를 유지하려고 할텐데 그럼 헤더, 푸터가 적용되면 어떻게 되는거지..?)
    <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-gray-50">
      {/* 회원가입 폼 */}
      <FormProvider {...methods}>
        <form className="my-14 flex h-fit w-[528px] flex-col gap-9 bg-white px-5 py-10">
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
