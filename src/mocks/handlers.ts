import {
  patchUserInformationHandler,
  userInformationHandler,
} from './handlers/user'
import { courseInformationHandler } from './handlers/course'
import { notificationHandlers } from './handlers/notification/index.ts'
import { bookmarkAnnouncementHandler } from './handlers/bookmarkAnnouncement/index.ts'
import { bookmarkStudyHandler } from './handlers/bookmarkStudy/index.ts'
import { applyListHandler } from './handlers/applyList/index.ts'
import {
  applyListDetailHandler,
  deleteApplyListHandler,
} from './handlers/applyListDetail/index.ts'
import { signupHandlers } from './handlers/auth/signupHandler.ts'
import {
  completeStudyHandler,
  patchReviewHandler,
  postReviewHandler,
} from './handlers/completeStudy/index.ts'
import { accountRecoveryHandler } from './handlers/accountRecovery/index.ts'
import { loginHandlers } from './handlers/auth/loginHandler.ts'
import { editPassWordHandler } from './handlers/user/editPassword.ts'
import { deleteUserHandler } from './handlers/user/withDraw.ts'
import { sendCodeHandler } from './handlers/certifyPhoneNumber/sendCodeHandler.ts'
import { certifyPhoneNumber } from './handlers/certifyPhoneNumber/index.ts'
import { deleteBookMarkAnnouncementHandler } from './handlers/bookmarkAnnouncement/deleteBookMarkAnnouncement.ts'
import { deleteBookMarkStudytHandler } from './handlers/bookmarkStudy/deleteBookMarkStudy.ts'
import { s3PresignedHandler } from './handlers/s3/index.ts'
import { findEmailHandlers } from './handlers/findAccount/findEmailHandler.ts'
export const handlers = [
  ...userInformationHandler,
  ...courseInformationHandler,
  ...notificationHandlers,
  ...bookmarkAnnouncementHandler,
  ...bookmarkStudyHandler,
  ...applyListHandler,
  ...applyListDetailHandler,
  ...signupHandlers,
  ...completeStudyHandler,
  ...accountRecoveryHandler,
  ...loginHandlers,
  ...editPassWordHandler,
  ...deleteUserHandler,
  ...sendCodeHandler,
  ...certifyPhoneNumber,
  ...deleteBookMarkAnnouncementHandler,
  ...deleteBookMarkStudytHandler,
  ...deleteApplyListHandler,
  ...postReviewHandler,
  ...patchReviewHandler,
  ...s3PresignedHandler,
  ...patchUserInformationHandler,
  ...findEmailHandlers,
]
