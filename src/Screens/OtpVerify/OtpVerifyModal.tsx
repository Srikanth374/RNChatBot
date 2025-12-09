// OtpVerifyModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  TextInput,
  Animated,
} from 'react-native';
import { OtpVerifyReturns } from './OtpVerify.types';
import { useOtpVerifyModalController } from './OtpVerifyModalController';

const OtpVerifyModal: React.FC<OtpVerifyReturns> = props => {
  const { visible, phoneNumber, onClose } = props;

  const {
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
  } = useOtpVerifyModalController(props);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeText}>×</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Verify via OTP</Text>

          <Text style={styles.subtitle}>We have sent verification code to</Text>

          <View style={styles.phoneRow}>
            <Text style={styles.phoneText}>{phoneNumber}</Text>
            <TouchableOpacity onPress={props.onEditPhone}>
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          {/* Hidden input that actually receives the text */}
          <TextInput
            ref={inputRef}
            style={styles.hiddenInput}
            value={code}
            onChangeText={handleChangeCode}
            keyboardType="number-pad"
            maxLength={4}
            autoFocus
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {/* OTP boxes */}
          <Pressable
            style={styles.otpRow}
            onPress={() => inputRef.current?.focus()}
          >
            {[0, 1, 2, 3].map(index => {
              const digit = code[index] || '';
              const showCursor =
                isFocused && index === activeIndex && !digit && visible; // only show where next input will go

              return (
                <View key={index} style={styles.otpBox}>
                  {digit ? (
                    <Text style={styles.otpDigit}>{digit}</Text>
                  ) : showCursor ? (
                    <Animated.View
                      style={[styles.cursor, { opacity: cursorOpacity }]}
                    />
                  ) : null}
                </View>
              );
            })}
          </Pressable>

          {/* Resend / Call area */}
          <View style={styles.footer}>
            <Text style={styles.infoText}>Didn’t get the OTP?</Text>
            <TouchableOpacity onPress={handleResend} disabled={secondsLeft > 0}>
              <Text
                style={[
                  styles.resendText,
                  secondsLeft > 0 && styles.resendDisabled,
                ]}
              >
                {secondsLeft > 0
                  ? `Resend SMS in ${secondsLeft}s`
                  : 'Resend SMS'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={handleCall}>
            <Text style={styles.callText}>Receive OTP via Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default OtpVerifyModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    right: 14,
    top: 10,
    padding: 4,
  },
  closeText: {
    fontSize: 22,
    color: '#9CA3AF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 18,
  },
  phoneText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  editIcon: {
    marginLeft: 8,
    fontSize: 16,
    color: '#2563EB',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    width: '80%',
  },
  otpBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5EDF8',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FBFF',
  },
  otpDigit: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  cursor: {
    width: 2,
    height: 24,
    borderRadius: 1,
    backgroundColor: '#111827',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#111827',
    marginRight: 4,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
  },
  resendDisabled: {
    color: '#D1D5DB',
  },
  callText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#2563EB',
    marginTop: 4,
  },
});
