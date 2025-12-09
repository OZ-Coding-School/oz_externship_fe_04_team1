export interface EditPassword {
  password: string
  new_password: string
  repeat_new_password: string
  // API명세서에는 email, password만 나와있는데 와이어 프레임상 필요한 데이터 기재. -> 추후에 변경할 예정
}
