export interface ApplyListDetail {
  id: number
  self_introduction: string
  motivation: string
  objective: string
  available_time: string
  has_stydy_experience: boolean
  study_experience: string
  status: Status
  created_at?: string
  updated_at?: string
  recruitment: Recruitment
}
type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'
interface Recruitment {
  uuid?: string
  title: string
}
