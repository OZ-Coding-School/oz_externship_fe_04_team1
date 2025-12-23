import { useNavigate } from 'react-router'
import { ROUTE_PATHS } from '@/constant/route'
import { showToast } from '@/components/common/toast/Toast'
import LoginStateStore from '@/store/loginStateStore'

export default function useRequireLogin() {
  const navigate = useNavigate()
  const loginState = LoginStateStore((s) => s.loginState)
  const isGuest = loginState === 'GUEST'

  const requireLogin = (action: () => void) => {
    if (isGuest) {
      showToast.error('실패', '로그인 후 이용할 수 있는 서비스입니다')
      navigate(ROUTE_PATHS.LOGIN)
      return
    }
    action()
  }

  return { isGuest, requireLogin }
}
