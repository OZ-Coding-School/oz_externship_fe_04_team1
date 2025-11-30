import { userInformationHandler } from './handlers/user'
import { courseInformationHandler } from './handlers/course.ts'

export const handlers = [...userInformationHandler, ...courseInformationHandler]
