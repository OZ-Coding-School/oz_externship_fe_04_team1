import { getUserInformationApi } from '@/api/userInformation'
import LoginStateStore from '@/store/loginStateStore'
import type { UserInformation } from '@/types/userInformation'
import { useQuery } from '@tanstack/react-query'

const useUserData = () => {
  const loginState = LoginStateStore((state) => state.loginState)
  return useQuery<UserInformation>({
    queryKey: ['userData'],
    queryFn: getUserInformationApi,
    enabled: loginState === 'USER',
  })
}

export default useUserData
