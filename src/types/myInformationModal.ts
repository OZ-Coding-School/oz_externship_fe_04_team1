export type MyInformationModalVariant =
  | 'editModal'
  | 'editPhoneNumberModal'
  | 'editPassWordModal'
  | 'withDrawModal'
  | null
export type NotNullInformationModalVariant = Exclude<
  MyInformationModalVariant,
  null
>
