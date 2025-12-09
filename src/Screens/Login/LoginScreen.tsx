import React, { useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Linking,
  FlatList,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { LoginScreenController } from './LoginScreenController';
import OtpVerifyModal from '../OtpVerify/OtpVerifyModal';
const LOGO = require('../../assets/logo.png');

export default function LoginScreen() {
  const {
    phone,
    setPhone,
    countryCode,
    setCountryCode,
    isValidPhone,
    handleVerifyOtp,
    showCountrySelector,
    setShowCountrySelector,
    toggleCountrySelector,
    onPressVerify,
    otpVisible,
    handleCloseModal,
  } = LoginScreenController();

  const selectCountry = (code: string) => {
    setCountryCode(code);
    setShowCountrySelector(false);
  };
  const HEADER_UNDER_STATUSBAR_HEIGHT = 2;
  const phoneInputRef = useRef<TextInput>(null);
  const COUNTRY_LIST = [
    { id: 'IN', name: 'India', code: '+91', flag: '🇮🇳' },
    { id: 'US', name: 'USA', code: '+1', flag: '🇺🇸' },
    { id: 'UK', name: 'UK', code: '+44', flag: '🇬🇧' },
  ];
  const fullPhone = `${countryCode} ${phone}`;

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={['top']} style={styles.topSafeArea}>
        <StatusBar
          translucent={false}
          backgroundColor={styles.topSafeArea.backgroundColor}
          barStyle="light-content"
        />
      </SafeAreaView>

      <SafeAreaView
        edges={['left', 'right', 'bottom']}
        style={styles.container}
      >
        <View
          style={[
            styles.headerStrip,
            { height: HEADER_UNDER_STATUSBAR_HEIGHT },
          ]}
        />

        <KeyboardAvoidingView
          style={styles.flex}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <ScrollView
            contentContainerStyle={styles.contentContainer}
            keyboardShouldPersistTaps="handled"
          >
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />

            <View style={styles.titleBlock}>
              <Text style={styles.mainTitle}>Login or signup</Text>
              <View style={{ height: 8 }} />
              <Text style={styles.subtitleTitle}>Your All-in-One App</Text>
              <Text style={styles.subtitleDesc}>Buy, sell, earn.</Text>
            </View>

            <View style={styles.form}>
              <Text style={styles.label}>
                Phone <Text style={styles.asterisk}>*</Text>
              </Text>

              <View style={styles.phoneRow}>
                <TouchableOpacity
                  style={styles.countryBtn}
                  onPress={toggleCountrySelector}
                  activeOpacity={0.7}
                >
                  <Text style={styles.countryText}>{countryCode}</Text>
                  <Text style={styles.chevron}>▾</Text>
                </TouchableOpacity>

                <TextInput
                  ref={phoneInputRef}
                  style={styles.phoneInput}
                  placeholder="Enter phone number"
                  placeholderTextColor="#9AA0A6"
                  keyboardType="phone-pad"
                  value={phone}
                  onChangeText={setPhone}
                  maxLength={10}
                />
              </View>

              {showCountrySelector && (
                <View style={styles.countryList}>
                  <FlatList
                    data={COUNTRY_LIST}
                    keyExtractor={item => item.id}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.countryItem}
                        onPress={() => selectCountry(item.code)}
                      >
                        <Text style={styles.countryItemText}>
                          {item.flag} {item.code} ({item.name})
                        </Text>
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator} />
                    )}
                  />
                </View>
              )}
            </View>

            <View style={{ flex: 1 }} />

            <View style={styles.bottom}>
              <TouchableOpacity
                onPress={onPressVerify}
                disabled={!isValidPhone}
                activeOpacity={isValidPhone ? 0.7 : 1}
                style={[
                  styles.otpButton,
                  isValidPhone && styles.otpButtonEnabled,
                ]}
              >
                <Text
                  style={[
                    styles.otpText,
                    isValidPhone && styles.otpTextEnabled,
                  ]}
                >
                  Verify OTP
                </Text>
              </TouchableOpacity>

              <View style={styles.termsRow}>
                <Text style={styles.termsText}>By clicking, I accept. </Text>

                <TouchableOpacity
                  onPress={() => Linking.openURL('https://example.com/terms')}
                >
                  <Text style={styles.linkText}>Terms and Conditions</Text>
                </TouchableOpacity>

                <Text style={styles.termsText}> </Text>

                <TouchableOpacity
                  onPress={() => Linking.openURL('https://example.com/privacy')}
                >
                  <Text style={styles.linkText}>Privacy Policy</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
          <OtpVerifyModal
            visible={otpVisible}
            phoneNumber={fullPhone}
            onClose={handleCloseModal}
            onSubmit={code => console.log('OTP:', code)}
            onResend={() => console.log('Resend')}
            onCall={() => console.log('Call')}
            onEditPhone={handleCloseModal}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  topSafeArea: {
    backgroundColor: '#2C4ED9',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerStrip: {
    width: '100%',
    backgroundColor: '#2C4ED9',
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  logo: {
    width: 120,
    height: 60,
    alignSelf: 'center',
    marginBottom: 18,
  },
  titleBlock: {
    paddingTop: 4,
    paddingBottom: 20,
  },
  mainTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1F2937',
  },
  subtitleTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  subtitleDesc: {
    marginTop: 6,
    fontSize: 14,
    color: '#7B8794',
  },
  form: {
    marginTop: 6,
  },
  label: {
    color: '#5C6B74',
    marginBottom: 8,
    fontSize: 16,
  },
  asterisk: {
    color: '#D23C3C',
  },
  phoneRow: {
    flexDirection: 'row',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  countryBtn: {
    width: 70,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#ffffffff',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    borderRightColor: '#E2E8F0',
    borderRightWidth: 1,
  },
  countryText: {
    fontSize: 18,
  },
  countryItemText: {
    fontSize: 14,
    color: '#111827',
  },

  separator: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },

  chevron: {
    fontSize: 16,
    color: '#6B7280',
  },
  phoneInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    paddingLeft: 10,
  },
  countryList: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#E6EEF8',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
  },
  countryItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  bottom: {
    paddingTop: 18,
  },
  otpButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: '#D9E0EF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  otpButtonEnabled: {
    backgroundColor: '#2C4ED9',
  },
  otpText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF99',
  },
  otpTextEnabled: {
    color: '#FFFFFF',
  },
  termsRow: {
    marginTop: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
  },
  linkText: {
    fontSize: 12,
    color: '#1E40AF',
    textDecorationLine: 'underline',
  },
});
