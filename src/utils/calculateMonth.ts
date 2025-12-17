// utils
export function calculateDurationMonths(start: string, end: string) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const yearDiff = endDate.getFullYear() - startDate.getFullYear()
  const monthDiff = endDate.getMonth() - startDate.getMonth()

  return yearDiff * 12 + monthDiff
}
