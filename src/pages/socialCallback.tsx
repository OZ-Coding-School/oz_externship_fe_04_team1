import { getUserInformationApi } from '@/api/userInformation'
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
  document.cookie = `${name}=; max-age=0; path=/`
}

function SocialCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAccessToken = async () => {
      try {
        // 엑세스 토큰 가지고 오기 -> 전역으로 관리
        const accessToken = getCookie('access_token')
        if (!accessToken) throw new Error('access token을 가져올 수 없음')
        AuthStateStore.getState().setAccessToken(accessToken)

        // 사용자 정보 불러오기
        await getUserInformationApi()
        LoginStateStore.getState().setLoginState('USER')

        deleteCookie('access_token')

        navigate(ROUTE_PATHS.HOME)
      } catch (error) {
        showToast.error(
          '소셜 로그인 실패',
          error instanceof Error ? error.message : '알 수 없는 오류'
        )
      }
    }
    handleAccessToken()
  }, [])

  return <div>로그인 중...</div>
}

export default SocialCallback
