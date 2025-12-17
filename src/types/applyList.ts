export type ApplyList = {
  id: number
  status: Status
  recruitment: Recruitment
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
  thumbnail_img_url: string
  expected_headcount: number
  close_at: string
  end_at: string
  lectures: Lectures[]
  tags: Tags[]
}
