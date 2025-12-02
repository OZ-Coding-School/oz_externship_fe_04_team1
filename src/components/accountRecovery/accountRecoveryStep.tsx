import { useState } from 'react'
import AccountRecoverModal from '@/components/accountRecovery/accountRecoverModal'
import EmailVerificationModal from '@/components/accountRecovery/emailVerificationModal'
interface Props {
  isOpen: boolean
  onClose: () => void
}
export default function AccountRecoveryStep({ isOpen, onClose }: Props) {
  const [step, setStep] = useState(1)
  const handleClose = () => {
    setStep(1)
    onClose()
  }
  return (
    <div>
      {step === 1 && (
        <AccountRecoverModal
          isOpen={isOpen}
          onClose={handleClose}
          onNext={() => {
            setStep(2)
          }}
        />
      )}
      {step === 2 && <EmailVerificationModal onClose={handleClose} />}
    </div>
  )
}
