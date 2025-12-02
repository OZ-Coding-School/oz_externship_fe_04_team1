export interface ApplyListDetail {
  id: number
  title: string
  // 현재 api명세서에 누락되어있어 추가 요청한 상태
  self_introduction: string
  motivation: string
  objective: string
  available_time: string
  has_stydy_experience: boolean
  study_experience: string
  status: Status
  created_at?: string
  updated_at?: string
}
type Status = 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'CANCELED'
