import React, { useState } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { useTheme } from '@/const/theme';
import Input from "@/componant/input";
import { Dropdown } from "react-native-element-dropdown";
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import URL from '@/hooks/config';

export default function SignUpScreen() {
  const { colors } = useTheme(); // Get colors from theme
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
      password: password,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    try {
      const response = await fetch(url, options);
      const responseData = await response.json();

      if (responseData && responseData.message) {
        setResponseMessage(responseData.message);
      } else {
        setResponseMessage('Unexpected response format');
      }

      // After successful signup, save values in AsyncStorage
      await AsyncStorage.setItem('isLoggedIn', 'true');
      await AsyncStorage.setItem('role', role);
      await AsyncStorage.setItem('id', id);
      await AsyncStorage.setItem('name', name);

      // Navigate to the tabs screen
      router.replace("/(tabs)");

    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error occurred during signup.');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Sign Up</Text>

      <Dropdown
        style={[styles.dropdown, { borderColor: colors.primary }]}
        data={roleOptions} // Use correct data for dropdown
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
      />

      <Input
        label="ID"
        placeholder="Enter your ID"
        value={id}
        onChangeText={setId}
      />

      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <Button
        title="Sign Up"
        onPress={handleSignUp}
        color={colors.primary}
      />

      {responseMessage && <Text style={[styles.responseMessage, { color: colors.text }]}>{responseMessage}</Text>}
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
    width: '100%',
    height: 50,
    marginBottom: 20,
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
});

// Correctly declared data for dropdown
const roleOptions = [
  { label: "Production Head", value: "production_head" },
  { label: "Quality Checker", value: "quality" },
  { label: "Operator", value: "operator" },
];

