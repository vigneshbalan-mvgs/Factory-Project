import { View, TextInput, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/const/theme'; // Import the useTheme hook

export default function InputComponent({
  label,
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
}) {
  const [inputValue, setInputValue] = useState(value);
  const { colors } = useTheme(); // Destructure the colors from the theme

  // Handle text change in the input field
  const handleTextChange = (text) => {
    setInputValue(text);
    onChangeText(text); // Call the callback function passed from parent
  };

  return (
    <View style={[styles.container, { marginBottom: 20 }]}>
      {label && <Text style={[styles.label, { color: colors.text }]}>{label}</Text>} {/* Use dynamic color for label */}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: colors.muted, // Dynamic background based on theme
            borderColor: colors.border, // Dynamic border color based on theme
            color: colors.text, // Text color adapts to the theme
          },
        ]}
        value={inputValue}
        placeholder={placeholder}
        onChangeText={handleTextChange}
        secureTextEntry={secureTextEntry} // For password inputs
        placeholderTextColor={colors.text} // Dynamic placeholder text color
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    fontSize: 16,
  },
});

