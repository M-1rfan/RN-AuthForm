import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Toast from 'react-native-toast-message';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  // This function will be called upon successful login
  const handleLoginSuccess = async (email, token) => {
    try {
      await AsyncStorage.setItem('authToken', token);
      setUserEmail(email);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Failed to save token:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('authToken');
      setIsLoggedIn(false);
      setUserEmail('');
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  };

  // Deep linking config
  const linking = {
    prefixes: ['myapp://', 'https://myapp.com'],
    config: {
      screens: {
        Login: 'login',
        SignUp: 'signup',
        Dashboard: 'dashboard',
        ForgotPassword: 'forgot-password',
        ResetPassword: 'reset-password/:token',
      },
    },
  };

  return (
    <View style={styles.appContainer}>
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          {isLoggedIn ? (
            <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
              {props => (
                <DashboardScreen
                  {...props}
                  userEmail={userEmail}
                  onLogout={handleLogout}
                />
              )}
            </Stack.Screen>
          ) : (
            <>
              <Stack.Screen name="Login" options={{ headerShown: false }}>
                {props => (
                  <LoginScreen {...props} onLoginSuccess={handleLoginSuccess} />
                )}
              </Stack.Screen>
              <Stack.Screen name="SignUp" options={{ headerShown: false }}>
                {props => (
                  <SignUpScreen
                    {...props}
                    onSignUpSuccess={() => props.navigation.navigate('Login')}
                  />
                )}
              </Stack.Screen>

              <Stack.Screen
                name="ForgotPassword"
                component={ForgotPasswordScreen}
                options={{ headerShown: true, title: ' ' }}
              />
              <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

export default App;
