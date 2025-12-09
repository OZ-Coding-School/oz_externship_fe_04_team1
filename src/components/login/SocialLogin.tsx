import kakao from '@/assets/icons/kakao.svg'
import naver from '@/assets/icons/naver.svg'

type SocialLoginProps = {
  onLoginWithKakao: () => void
  onLoginWithNaver: () => void
}

function SocialLogin({ onLoginWithKakao, onLoginWithNaver }: SocialLoginProps) {
  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        className="inline-flex h-[52px] cursor-pointer items-center justify-center rounded-md bg-[rgb(255,230,3)] text-center text-base font-normal text-[rgb(56,28,26)]"
        onClick={onLoginWithKakao}
      >
        <img className="pr-2" src={kakao} alt="" />
        카카오 간편 로그인 / 가입
      </button>
      <button
        type="button"
        className="inline-flex h-[52px] cursor-pointer items-center justify-center rounded-md bg-[rgb(4,199,92)] text-base font-normal text-white"
        onClick={onLoginWithNaver}
      >
        <img className="pr-2" src={naver} alt="" /> 네이버 간편 로그인 / 가입
      </button>
    </div>
  )
}

export default SocialLogin
