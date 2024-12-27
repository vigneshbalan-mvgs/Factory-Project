import React, { useState } from 'react';
import { View, Button, StyleSheet, Text, ActivityIndicator, Alert } from 'react-native';
import { useTheme } from '@/const/theme';
import Input from "@/componant/input";
import { Dropdown } from "react-native-element-dropdown";
import { router } from 'expo-router';

export default function CreateUserScreen() {
  const { colors } = useTheme(); // Get colors from theme
  const [role, setRole] = useState(null);
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false); // Loading state

  const handleCreateUser = async () => {
    if (!name || !id || !password || !role) {
      setResponseMessage('Please fill all the fields.');
      return;
    }

    const url = 'http://localhost:3001/api/admin/signup';  // Use the API URL you provided

    const data = {
      name: name,
      Id: id,
      password: password,  // Send the plain text password
      type: role,
    };

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    };

    setLoading(true);  // Start loading state
    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const responseData = await response.json();

      console.log('Response Data:', responseData);

      if (responseData.status === false) {
        setResponseMessage(responseData.message || 'An error occurred');
        Alert.alert('User Creation Failed', responseData.message || 'An error occurred');
      } else {
        setResponseMessage('User created successfully');
        Alert.alert('User Creation Successful', 'The user has been created successfully.');
        // Optionally, navigate to another screen after successful user creation
        router.replace('/AdminDashboard');  // Navigate to Admin Dashboard or any other screen
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage(`An error occurred: ${error.message}`);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    } finally {
      setLoading(false);  // Stop loading state
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Create User</Text>

      <Dropdown
        style={[styles.dropdown, { borderColor: colors.border }]}
        data={roleOptions}
        labelField="label"
        valueField="value"
        placeholder="Select Role"
        value={role}
        onChange={item => setRole(item.value)}
      />

      <Input
        label="Name"
        placeholder="Enter the user's name"
        value={name}
        onChangeText={setName}
      />

      <Input
        label="ID"
        placeholder="Enter the user's ID"
        value={id}
        onChangeText={setId}
      />

      <Input
        label="Password"
        placeholder="Enter the user's password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      {responseMessage ? (
        <Text style={styles.responseMessage}>{responseMessage}</Text>
      ) : null}

      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        <Button
          title="Create User"
          onPress={handleCreateUser}
          color={colors.primary}
        />
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
    borderColor: '#ccc',
    width: '100%',
    height: 50,
    marginBottom: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  responseMessage: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',  // Show error message in red color
    textAlign: 'center',
  },
});

const roleOptions = [
  { label: "Admin", value: "Admin" },
  { label: "Production Head", value: "production_head" },
  { label: "Quality Checker", value: "quality" },
  { label: "Operator", value: "operator" },
];

