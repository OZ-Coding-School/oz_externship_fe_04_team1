import { useState } from 'react'
import AccountRecoverModal from '@/components/login/accountRecovery/accountRecoverModal'
import EmailVerificationModal from '@/components/login/accountRecovery/emailVerificationModal'

interface RecoverStepProps {
  isOpen: boolean
  onClose: () => void
}
enum Step {
  AccountAlert = 1,
  EmailVerification = 2,
}

export default function AccountRecoveryStep({
  isOpen,
  onClose,
}: RecoverStepProps) {
  const [step, setStep] = useState(Step.AccountAlert)
  const handleClose = () => {
    setStep(Step.AccountAlert)
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
