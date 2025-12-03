import { useState } from 'react'
import AccountRecoverModal from '@/components/accountRecovery/accountRecoverModal'
import EmailVerificationModal from '@/components/accountRecovery/emailVerificationModal'

interface RecoverStepProps {
  isOpen: boolean
  onClose: () => void
}
export default function AccountRecoveryStep({
  isOpen,
  onClose,
}: RecoverStepProps) {
  const [step, setStep] = useState(1)
  const handleClose = () => {
    setStep(1)
    onClose()
  }
  return (
    <div>
      {step === Step.AccountAlert && (
        <AccountRecoverModal
          isOpen={isOpen}
          onClose={handleClose}
          onNext={() => {
            setStep(Step.EmailVerification)
          }}
        />
      )}
      {step === Step.EmailVerification && (
        <EmailVerificationModal onClose={handleClose} />
      )}
    </div>
  )
}

enum Step {
  AccountAlert = 1,
  EmailVerification = 2,
}
