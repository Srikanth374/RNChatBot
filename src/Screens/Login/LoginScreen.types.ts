// src/screens/Login/types.ts
export interface LoginControllerReturn {
  phone: string;
  setPhone: (val: string) => void;
  countryCode: string;
  setCountryCode: (val: string) => void;
  isValidPhone: boolean;
  handleVerifyOtp: () => void;
  showCountrySelector: boolean;
  setShowCountrySelector: (val: boolean) => void;
  toggleCountrySelector: () => void;
}
