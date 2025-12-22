export interface EditUserInformation {
  name: string
  nickname: string
  profile_img_url: string | null
  birthday: string
  gender: 'M' | 'F'
}
