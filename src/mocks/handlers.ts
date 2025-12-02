import { userInformationHandler } from './handlers/user'
import { courseInformationHandler } from './handlers/course.ts'
import { notificationHandlers } from './handlers/notification/index.ts'
import { bookmarkAnnouncementHandler } from './handlers/bookmarkAnnouncement/index.ts'
import { bookmarkStudyHandler } from './handlers/bookmarkStudy/index.ts'
import { applyListHandler } from './handlers/applyList/index.ts'

export const handlers = [
  ...userInformationHandler,
  ...courseInformationHandler,
  ...notificationHandlers,
  ...bookmarkAnnouncementHandler,
  ...bookmarkStudyHandler,
  ...applyListHandler,
]
