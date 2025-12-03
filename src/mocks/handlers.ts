import { userInformationHandler } from './handlers/user'
import { courseInformationHandler } from './handlers/course.ts'
import { notificationHandlers } from './handlers/notification/index.ts'
import { bookmarkAnnouncementHandler } from './handlers/bookmarkAnnouncement/index.ts'
import { bookmarkStudyHandler } from './handlers/bookmarkStudy/index.ts'
import { applyListHandler } from './handlers/applyList/index.ts'
import { applyListDetailHandler } from './handlers/applyListDetail/index.ts'
import { signupHandlers } from './handlers/auth/signupHandler.ts'

export const handlers = [
  ...userInformationHandler,
  ...courseInformationHandler,
  ...notificationHandlers,
  ...bookmarkAnnouncementHandler,
  ...bookmarkStudyHandler,
  ...applyListHandler,
  ...applyListDetailHandler,
  ...signupHandlers,
]
