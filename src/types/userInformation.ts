export interface UserInformation {
  id: number
  email: string
  nickname: string
  phone_number: string
  birthday: string
  gender: 'M' | 'F'
  profile_img_url: string
  created_at?: string
}
