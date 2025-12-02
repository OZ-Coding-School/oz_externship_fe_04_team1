export type ApplyList = {
  id: number
  status: Status
  recruitment: Recruitment[]
  created_at: string
}

type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'
interface Lectures {
  id: number
  title: string
  instructor: string
}
interface Tags {
  id: number
  name: string
}
interface Recruitment {
  uuid?: string
  title: string
  thumbnail_img_url?: string | null
  // thumbnail_img_url api명세서에 없어가지고 null 허용 -> 백엔드에 요청한 사항
  expected_headcount: number
  close_at: string
  lecture: Lectures[]
  tags: Tags[]
}
