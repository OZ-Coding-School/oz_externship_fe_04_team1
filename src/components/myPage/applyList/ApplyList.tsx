import ApplyListDesktop from './ApplyListDesktop'
import ApplyListMobile from './ApplyListMobile'

function ApplyList() {
  return (
    <>
      <div className="hidden md:block">
        <ApplyListDesktop />
      </div>
      <div className="block md:hidden">
        <ApplyListMobile />
      </div>
    </>
  )
}
export default ApplyList
