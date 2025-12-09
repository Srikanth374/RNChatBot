export interface OtpVerifyReturns {
  visible: boolean;
  phoneNumber: string;
  onClose: () => void;
  onSubmit?: (code: string) => void;
  onResend?: () => void;
  onCall?: () => void;
  onEditPhone?: () => void;
}
