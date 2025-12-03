import { Link } from 'react-router'
import Button from '../common/Button'
import Input from '../common/Input'

function LoginForm() {
  return (
    <form>
      <div className="flex flex-col gap-3">
        <Input className="h-12" placeholder="아이디(example@gmail.com)" />
        <Input
          className="h-12"
          placeholder="비밀번호 (8~15자의 영문 대소문, 숫자, 특수문자 포함)"
        />
      </div>
      <div className="text-primary-600 mt-1 flex items-center gap-2 text-sm font-normal">
        <Link to={'/find-id'}>아이디 찾기</Link>
        <span className="text-xl">|</span>
        <Link to={'/find-password'}>비밀번호 찾기</Link>
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
