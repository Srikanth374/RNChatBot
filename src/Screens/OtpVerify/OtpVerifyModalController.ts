// OtpVerifyModalController.ts
import { useEffect, useRef, useState } from 'react';
import { Animated, TextInput } from 'react-native';
import { OtpVerifyReturns } from './OtpVerify.types';

const RESEND_SECONDS = 30;

export const useOtpVerifyModalController = ({
  visible,
  onSubmit,
  onResend,
  onCall,
}: OtpVerifyReturns) => {
  const [code, setCode] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(RESEND_SECONDS);
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef<TextInput | null>(null);

  // For blinking cursor
  const cursorOpacity = useRef(new Animated.Value(1)).current;

  // Reset OTP when modal opens
  useEffect(() => {
    if (visible) {
      setCode('');
      setSecondsLeft(RESEND_SECONDS);

      // Small timeout to ensure TextInput is mounted before focusing
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [visible]);

  // Countdown timer
  useEffect(() => {
    if (!visible) return;
    if (secondsLeft <= 0) return;

    const id = setInterval(() => {
      setSecondsLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(id);
  }, [secondsLeft, visible]);

  // Blinking cursor loop
  useEffect(() => {
    if (!visible || !isFocused) {
      cursorOpacity.setValue(1);
      return;
    }

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorOpacity, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(cursorOpacity, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
      ]),
    );

    loop.start();
    return () => {
      loop.stop();
      cursorOpacity.setValue(1);
    };
  }, [visible, isFocused, cursorOpacity]);

  const handleChangeCode = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 4);
    setCode(digits);
    if (digits.length === 4 && onSubmit) {
      onSubmit(digits);
    }
  };

  const handleResend = () => {
    if (secondsLeft > 0) return;
    setSecondsLeft(RESEND_SECONDS);
    onResend && onResend();
  };

  const handleCall = () => {
    onCall && onCall();
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // Index where next digit will appear (0–3)
  const activeIndex = Math.min(code.length, 3);

  return {
    code,
    secondsLeft,
    inputRef,
    cursorOpacity,
    isFocused,
    activeIndex,
    handleChangeCode,
    handleResend,
    handleCall,
    handleFocus,
    handleBlur,
  };
};
