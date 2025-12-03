export interface CompleteStudy {
  id: number
  name: string
  is_leader: boolean
  start_at: string
  end_at: string
  max_headcount: number
  current_headcount: number
  profile_img_url: string
  status: Status
  lectures: Lectures[]
  reviews: Reviews[]
}
type Status = 'PENDING' | 'ONGOING' | 'ENDED'
interface Lectures {
  id: number
  title: string
  instructor: string
}
interface Reviews {
  id: number
  is_mine: boolean
  star_rating: number
  content: string
}
