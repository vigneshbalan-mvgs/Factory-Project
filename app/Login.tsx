import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { colors } from '@/const/colors'; // Import the colors directly
import Input from "@/componant/input";
import { Dropdown } from "react-native-element-dropdown";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '@/hooks/config';

export default function SignUpScreen() {
  const [role, setRole] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSignUp = async () => {
    if (!name || !id || !password || !role) {
      setResponseMessage('Please fill all the fields.');
      return;
    }

    const url = `${URL}/api/login`;

    const data = {
      type: role,
      name: name,
      Id: id,
      password: password,  // Send the hashed password
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        // If the response is not OK (status code 4xx or 5xx), throw an error
        throw new Error(`Server error: ${response.statusText}`);
      }

      const responseData = await response.json();

      console.log('Response Data:', responseData);

      if (responseData.status === false) {
        // Handle failed response (e.g., user not found)
        setResponseMessage(responseData.message || 'An error occurred');
      } else {
        // Handle successful response
        setResponseMessage('Sign-up successful');
        await AsyncStorage.setItem('token', responseData.data);

        // Save session details after successful signup
        await AsyncStorage.setItem('isLoggedIn', 'true');
        await AsyncStorage.setItem('role', role);
        await AsyncStorage.setItem('id', id);
        await AsyncStorage.setItem('name', name);

        // Navigate based on the role
        switch (role) {
          case 'Admin':
            router.replace('/Admin');
            break;
          case 'production_head':
            router.replace('/Head');
            break;
          case 'operator':
            router.replace('/Operator');
            break;
          case 'quality':
            router.replace('/Quality');
            break;
        }
      }
    } catch (error) {
      // Catch any errors thrown during the fetch or in the code above
      console.error('Error:', error);
      setResponseMessage(`An error occurred: ${error.message}`);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Sign Up</Text>

      <Dropdown
        style={[styles.dropdown, { borderColor: colors.secondary }]} // Use theme's secondary color
        data={roleOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Role"
        value={role}
        onChange={item => setRole(item.value)}
      />

      <Input
        label="Name"
        placeholder="Enter your name"
        value={name}
        onChangeText={setName}
        style={[styles.input, { borderColor: colors.secondary }]} // Use theme's secondary color
      />

      <Input
        label="ID"
        placeholder="Enter your ID"
        value={id}
        onChangeText={setId}
        style={[styles.input, { borderColor: colors.secondary }]} // Use theme's secondary color
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={[styles.input, { borderColor: colors.secondary }]} // Use theme's secondary color
      />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.primary }]}
        onPress={handleSignUp}
      >
        <Text style={[styles.buttonText, { color: colors.background }]}>Login</Text>
      </TouchableOpacity>

      {/* Display response message */}
      {responseMessage && (
        <Text style={[styles.responseMessage, { color: colors.text }]}>{responseMessage}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  dropdown: {
    borderWidth: 1,
    width: '100%',
    height: 50,
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  input: {
    width: '100%',
    height: 50,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 8,
  },
  responseMessage: {
    marginTop: 20,
    fontSize: 16,
  },
  button: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  }
});

const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Production Head", value: "production_head" },
  { label: "Quality Checker", value: "quality" },
  { label: "Operator", value: "operator" },
];

