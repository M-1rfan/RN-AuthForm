import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import Toast from 'react-native-toast-message';
import { forgotPassword } from '../services/api';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleForgotPassword = async () => {
    try {
      const res = await forgotPassword(email);

      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: res.data.msg || 'Password reset link sent!',
      });

      setEmail('');
      setEmailSent(true);
    } catch (err) {
      console.error(err.response?.data || err.message);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.response?.data?.msg || 'Something went wrong',
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      {!emailSent ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Button title="Send Reset Link" onPress={handleForgotPassword} />
        </>
      ) : (
        <Text style={styles.successMsg}>
          Please check your email for the reset link.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  successMsg: {
    fontSize: 18,
    fontWeight: '600',
    color: '#155724',
    backgroundColor: '#d4edda',
    padding: 15,
    borderRadius: 8,
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
});

export default ForgotPasswordScreen;
