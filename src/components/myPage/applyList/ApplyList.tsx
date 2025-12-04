import { ApplyListModalProvider } from '@/store/context/applyListModalContext'
import ApplyListDesktop from './ApplyListDesktop'
import ApplyListMobile from './ApplyListMobile'
import ApplyOverLay from '../overlay/ApplyOverLay'

function ApplyList() {
  return (
    <ApplyListModalProvider>
      <ApplyOverLay />
      <div className="hidden md:block">
        <ApplyListDesktop />
      </div>
      <div className="block md:hidden">
        <ApplyListMobile />
      </div>
    </ApplyListModalProvider>
  )
}
export default ApplyList
