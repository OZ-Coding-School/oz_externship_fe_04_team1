export interface BookmarkAnnouncement {
  next: string | null
  previous: string | null
  results: Results[]
}
export interface Results {
  id: number
  recruitment: Recruitment
}
interface Recruitment {
  uuid: string
  title: string
  thumbnail_img_url: string
  expected_headcount: number
  close_at: string
  views_count: number
  bookmark_count: number
  lecture: Lectures[]
  tags: Tags[]
}
interface Lectures {
  id: number
  title: string
  instructor: string
}
interface Tags {
  id: number
  name: string
}
