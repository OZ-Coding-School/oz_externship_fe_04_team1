import type { UserInformation } from '@/types/userInformation'
import defaultImg from '@/assets/images/defaultProfileImg.svg'
import type { EditPassword } from '@/types/editPassword'
import type { EditUserInformation } from '@/types/editUserInformation'
export const userInformation: UserInformation[] = [
  {
    id: 1,
    email: 'test@naver.com',
    nickname: '테스트',
    name: '엄준식',
    phone_number: '01011111111',
    birthday: '2000-01-01',
    gender: 'F',
    profile_img_url: defaultImg,
    created_at: '2025-10-30T14:01:57.505250+09:00',
  },
]
export const editPassword: EditPassword = {
  current_password: 'Ozcoding1!',
  new_password: 'Ozcoding@',
  confirm_password: 'Ozcoding@',
}
export const editUserInformation: EditUserInformation = {
  nickname: '엄준식',
  name: '엄준식',
  profile_img_url: 'https://pbs.twimg.com/media/GPju6_VbcAEoF56.jpg',
  birthday: '2000-01-01',
  gender: 'M',
}
