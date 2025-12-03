import { Link, useNavigate } from 'react-router'
import Button from '../common/Button'
import Input from '../common/Input'
import { ROUTE_PATHS } from '@/constant/route'
import { useForm } from 'react-hook-form'
import type { ReqLoginFormData } from '@/types/login'

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReqLoginFormData>({
    mode: 'onSubmit',
  })
  const navigate = useNavigate()

  const emailRegister = register('email', {
    required: '이메일을 입력해주세요.',
    pattern: {
      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
      message: '올바른 이메일 형식이 아닙니다',
    },
  })

  const passwordRegister = register('password', {
    required: '비밀번호를 입력해주세요.',
  })

  const onSubmit = (data: ReqLoginFormData) => {
    console.log(data)
    navigate(ROUTE_PATHS.HOME)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-3">
        <div>
          <label htmlFor="login-email">
            <Input
              {...emailRegister}
              id="login-email"
              className="h-12"
              placeholder="아이디(example@gmail.com)"
              autoComplete="email"
            />
          </label>
          {errors.email && (
            <p className="text-danger-500 pt-2 pl-1 text-sm">
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="login-password">
            <Input
              {...passwordRegister}
              className="h-12"
              id="login-password"
              type="password"
              placeholder="비밀번호를 입력해주세요."
              autoComplete="current-password"
            />
          </label>
          {errors.password && (
            <p className="text-danger-500 pt-2 pl-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
      </div>
      <div className="text-primary-600 mt-1 flex items-center gap-2 text-sm font-normal">
        <Link to={ROUTE_PATHS.FIND_ID}>아이디 찾기</Link>
        <span className="text-xl">|</span>
        <Link to={ROUTE_PATHS.FIND_PASSWORD}>비밀번호 찾기</Link>
      </div>
      <Button
        type="submit"
        variant="secondary"
        className="mt-2.5 h-[52px] w-full bg-gray-200 hover:bg-gray-300"
      >
        일반회원 로그인
      </Button>
    </form>
  )
}

export default LoginForm
