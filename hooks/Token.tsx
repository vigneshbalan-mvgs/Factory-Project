
import AsyncStorage from '@react-native-async-storage/async-storage';
const fetchToken = async () => {
  try {
    const sanitizedToken = await AsyncStorage.getItem("token");

    // Remove leading and trailing quotes (if any)
    const token = sanitizedToken ? sanitizedToken.replace(/^"|"$/g, "") : null;

    console.log("Sanitized Token:", token);  // Log the sanitized token
    return token;
  } catch (error) {
    console.error("Error retrieving token from SecureStore:", error);
    return null;  // Return null in case of error
  }
};

