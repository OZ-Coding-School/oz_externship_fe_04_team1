import { userInformationHandler } from './handlers/user'
import { courseInformationHandler } from './handlers/course.ts'
import { notificationHandlers } from './handlers/notification/index.ts'
import { bookmarkAonnouncementHandler } from './handlers/bookmarkAnnouncement/index.ts'
import { bookmarkStudyHandler } from './handlers/bookmarkStudy/index.ts'

export const handlers = [
  ...userInformationHandler,
  ...courseInformationHandler,
  ...notificationHandlers,
  ...bookmarkAonnouncementHandler,
  ...bookmarkStudyHandler,
]
