import { showToast } from '@/components/common/toast/Toast'
import { ROUTE_PATHS } from '@/constant/route'
import AuthStateStore from '@/store/authStateStore'
import LoginStateStore from '@/store/loginStateStore'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

const getCookie = (name: string): string | undefined => {
  return document.cookie
    .split(';')
    .find((token) => token.trim().startsWith(name + '='))
    ?.split('=')[1]
}

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; max-age=0; path=/; domain=.ozcoding.site`
}

const SOCIAL_ERROR_MESSAGE: Record<string, string> = {
  KAKAO_ERROR_001: '토큰 또는 사용자 정보를 불러오지 못했습니다.',
  KAKAO_ERROR_002: '카카오 로그인 중 알 수 없는 오류가 발생했습니다.',
  NAVER_ERROR_001: '토큰 또는 사용자 정보를 불러오지 못했습니다.',
  NAVER_ERROR_002: '네이버 로그인 중 알 수 없는 오류가 발생했습니다.',
}

function SocialCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAccessToken = () => {
      try {
        const params = new URLSearchParams(location.search)
        const errorMsg = params.get('error_code')

        if (errorMsg) {
          const msg = SOCIAL_ERROR_MESSAGE[errorMsg]
          throw new Error(msg)
        }
        // 엑세스 토큰 가지고 오기 -> 전역으로 관리
        const accessToken = getCookie('access_token')
        if (!accessToken) throw new Error('access token을 가져올 수 없음')
        AuthStateStore.getState().setAccessToken(accessToken)

        LoginStateStore.getState().setLoginState('USER')

        deleteCookie('access_token')

        navigate(ROUTE_PATHS.HOME)
      } catch (error) {
        showToast.error(
          '소셜 로그인 실패',
          error instanceof Error ? error.message : '알 수 없는 오류'
        )
        navigate(ROUTE_PATHS.LOGIN)
      }
    }
    handleAccessToken()
  }, [])

  return <div>로그인 중...</div>
}

export default SocialCallback
