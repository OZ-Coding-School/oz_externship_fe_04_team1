import logoImg from '@/assets/images/logo.svg'
import LoginForm from '@/components/login/LoginForm'
import SocialLogin from '@/components/login/SocialLogin'
import { ROUTE_PATHS } from '@/constant/route'
import { Link } from 'react-router'

function LoginPage() {
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
          <SocialLogin />
          {/* 일반회원 로그인 및 아이디, 비밀번호 찾기 */}
          <LoginForm />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
