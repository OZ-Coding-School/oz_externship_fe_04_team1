// 유효성 검사 함수
export const validateEmail = (email: string) => {
  if (!email) {
    return '이메일 인증을 해주세요.'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return '올바른 이메일 형식이 아닙니다'
  }

  return ''
}

export const validateCode = (code: string) => {
  if (!code) {
    return '인증번호를 입력해주세요'
  }

  if (code.length !== 6) {
    return '인증번호는 6자리입니다'
  }

  if (!/^\d{6}$/.test(code)) {
    return '숫자만 입력 가능합니다'
  }

  return ''
}
