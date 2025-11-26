import type { UserInformation } from '@/types/userInformation'
import defaultImg from '@/assets/images/defaultProfileImg.svg'
export const userInformation: UserInformation[] = [
  {
    id: 1,
    email: 'test@naver.com',
    nickname: '테스트',
    phone_number: '01011111111',
    birthday: '2000-01-01',
    gender: 'M',
    profile_img_url: defaultImg,
  },
]
