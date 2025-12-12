export interface S3PresignedUrl {
  type:
    | 'USER_PROFILE_IMAGE'
    | 'STUDY_GROUP_IMAGE'
    | 'RECRUITMENT_IMAGE'
    | 'NOTE_IMAGE'
    | 'NOTE_ATTACHMENT'
    | 'RECRUITMENR_ATTACHMENT'
  content_type: string
  file_name: string
  file_ext: string
}
