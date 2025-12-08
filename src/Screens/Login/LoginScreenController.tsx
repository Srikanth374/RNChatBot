import { useCallback, useMemo, useState } from 'react';
import { LoginControllerReturn } from './LoginScreen.types';

const phoneDigitsOnly = (s: string) => s.replace(/\D/g, '');

export const LoginScreenController = (): LoginControllerReturn => {
  const [phone, setPhoneRaw] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+91');
  const [showCountrySelector, setShowCountrySelector] =
    useState<boolean>(false);

  const toggleCountrySelector = () => setShowCountrySelector(prev => !prev);

  const setPhone = useCallback((val: string) => {
    const digits = phoneDigitsOnly(val).slice(0, 10);
    setPhoneRaw(digits);
  }, []);

  const isValidPhone = useMemo(() => {
    return phone.length === 10;
  }, [phone]);

  const handleVerifyOtp = useCallback(() => {
    if (!isValidPhone) return;
    console.log('Request OTP for:', `${countryCode}${phone}`);
  }, [countryCode, phone, isValidPhone]);

  return {
    phone,
    setPhone,
    countryCode,
    setCountryCode,
    isValidPhone,
    handleVerifyOtp,
    showCountrySelector,
    setShowCountrySelector,
    toggleCountrySelector,
  };
};
