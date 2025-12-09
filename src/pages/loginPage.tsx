import { loginWithKakao } from '@/api/auth/login'
import logoImg from '@/assets/images/logo.svg'
import { showToast } from '@/components/common/toast/Toast'
import LoginForm from '@/components/login/LoginForm'
import SocialLogin from '@/components/login/SocialLogin'
import { ROUTE_PATHS } from '@/constant/route'
import { useLoginWithEmail } from '@/hooks/quries/auth/useLogin'
import LoginStateStore from '@/store/loginStateStore'
import type { ReqLoginFormData } from '@/types/login'
import type { UseFormSetError } from 'react-hook-form'
import { Link, useNavigate } from 'react-router'

function LoginPage() {
  const navigate = useNavigate()
  const { mutate: loginWithEmail, isPending: loggingIn } = useLoginWithEmail()
  const loginState = LoginStateStore((state) => state.setLoginState)

  const handleLogin = (
    data: ReqLoginFormData,
    setError: UseFormSetError<ReqLoginFormData>
  ) => {
    loginWithEmail(data, {
      onSuccess: () => {
        loginState('USER')
        showToast.success('로그인', '성공')
        navigate(ROUTE_PATHS.HOME)
      },
      onError: (error) => {
        const errorMessage = error.error_detail || '로그인에 실패했습니다.'
        setError('root', { message: errorMessage })
      },
    })
  }

  // 소셜 로그인
  const handleLoginWithKakao = () => {
    // 이동한 후 Msw작업은 어떻게??!?..
    loginWithKakao()
  }

  return (
    <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-gray-50">
      <div className="my-30 flex h-fit w-[348px] flex-col items-center">
        <div className="flex">
          <img src={logoImg} alt="" />
          <h2 className="text-primary-600 pl-2 text-[32px] font-bold">
            StudyHub
          </h2>
        </div>
        <h3 className="mt-1 text-3xl font-bold">로그인</h3>
        <p className="mt-2 text-sm font-light text-gray-600">
          아직 계정이 없으신가요?{' '}
          <Link className="text-primary-600" to={ROUTE_PATHS.SIGNUP}>
            회원가입하기
          </Link>
        </p>
        <div className="mt-4 flex w-full flex-col gap-10">
          {/* 소셜 로그인 */}
          <SocialLogin onLoginWithKakao={handleLoginWithKakao} />
          {/* 일반회원 로그인 및 아이디, 비밀번호 찾기 */}
          <LoginForm onSubmit={handleLogin} loggingIn={loggingIn} />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
