import Button from '@/components/common/Button'
import { showToast } from '@/components/common/toast/Toast'
import BasicInfoSection from '@/components/signup/BasicInfoSection'
import EmailVerificationSection from '@/components/signup/EmailVerificationSection'
import PasswordSection from '@/components/signup/PasswordSection'
import SmsVerificationSection from '@/components/signup/SmsVerificationSection'
import { ROUTE_PATHS } from '@/constant/route'
import { useSubmitSignup } from '@/hooks/quries/auth/useSignup'
import type {
  SignupFormValues,
  SignupFormValuesWithValidation,
} from '@/types/signup'
import { FormProvider, useForm, type FieldErrors } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

function SignupPage() {
  const methods = useForm<SignupFormValuesWithValidation>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      name: '',
      nickname: '',
      birthday: '',
      gender: '',
      email: '',
      phone_number: '',
      password: '',
      password_confirm: '',
      emailVerified: false,
      smsVerified: false,
      nicknameVerified: false,
    },
  })
  const { mutate: submitSignup } = useSubmitSignup()
  const navigate = useNavigate()

  // 인증 여부 확인
  const checkVerification = (data: SignupFormValuesWithValidation): boolean => {
    if (!data.nicknameVerified) {
      showToast.error('닉네임 중복 확인 필요', '닉네임 중복 확인을 해주세요.')
      return false
    }
    if (!data.emailVerified) {
      showToast.error('이메일 인증 필요', '이메일 인증을 완료해주세요.')
      return false
    }
    if (!data.smsVerified) {
      showToast.error('휴대폰 인증 필요', '휴대폰 인증을 완료해주세요.')
      return false
    }
    return true
  }

  // 제출 버튼 클릭 시 오류가 난 첫번째 인풋으로 포커스
  const onError = (errors: FieldErrors) => {
    const firstErrorField = Object.keys(errors)[0]
    methods.setFocus(firstErrorField as keyof SignupFormValues)
  }

  const handleSubmit = (data: SignupFormValuesWithValidation) => {
    // 인증 여부 확인
    if (!checkVerification(data)) return

    // password_confirm, validation 필드 제거
    const {
      password_confirm: _password_confirm,
      emailVerified: _emailVerified,
      smsVerified: _smsVerified,
      nicknameVerified: _nicknameVerified,
      ...rest
    } = data
    const signupData = {
      ...rest,
      birthday: formatBirthday(rest.birthday),
    }
    submitSignup(signupData, {
      onSuccess: () => {
        showToast.success('회원가입', '성공')
        navigate(ROUTE_PATHS.LOGIN)
      },
      onError: (error) => {
        showToast.error('회원가입 실패', error.message)
      },
    })
  }

  const formatBirthday = (birthday: string): string => {
    if (birthday.length === 8) {
      const year = birthday.slice(0, 4)
      const month = birthday.slice(4, 6)
      const day = birthday.slice(6, 8)
      return `${year}-${month}-${day}`
    }
    return birthday
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
          <SmsVerificationSection />

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
