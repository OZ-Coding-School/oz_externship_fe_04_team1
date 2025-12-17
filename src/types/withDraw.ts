export interface WithDraw {
  reason:
    | 'NO_LONGER_NEEDED'
    | 'LACK_OF_INTEREST'
    | 'TOO_DIFFICULT'
    | 'FOUND_BETTER_SERVICE'
    | 'PRIVACY_CONCERNS'
    | 'POOR_SERVICE_QUALITY'
    | 'TECHNICAL_ISSUES'
    | 'LACK_OF_CONTENT'
    | 'OTHER'
  agree_check: boolean
  reason_detail: string
}
