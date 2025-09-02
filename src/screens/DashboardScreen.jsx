import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

const DashboardScreen = ({ userEmail, onLogout }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.dashboardTitle}>Welcome to the Dashboard!</Text>
      <Text style={styles.dashboardText}>
        You have successfully logged in. Your email is:{' '}
        <Text style={styles.emailText}>{userEmail}</Text>
      </Text>
      <TouchableOpacity style={styles.logoutButton} onPress={onLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  dashboardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  dashboardText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
  emailText: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  logoutButton: {
    width: '80%',
    height: 50,
    backgroundColor: '#dc3545',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
