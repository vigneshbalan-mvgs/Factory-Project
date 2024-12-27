import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, TextInput, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import * as Animatable from 'react-native-animatable';
import { colors } from '@/const/colors'; // Import the colors file
import URL from '@/hooks/config';
import { AntDesign } from '@expo/vector-icons';

const HomePage = () => {
  const router = useRouter();

  const [data, setData] = useState([]);
  const [input, setInput] = useState('');
  const [type, setType] = useState('machine'); // Default type: material

  // Fetch data (GET request)
  const fetchData = async () => {
    const url = `${URL}/api/admin/search?type=${type}`;
    const options = { method: 'GET', headers: { 'Content-Type': 'application/json' } };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.status) {
        setData(result.data); // Assuming the result contains an array of items
        console.log('Fetched data:', result.data); // Debugging: Log the fetched data
      } else {
        console.log(result.message); // Handle error messages
        setData([]); // Clear data if no items found
        Alert.alert('No Items Found', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data. Please try again later.');
    }
  };

  // Create new item (POST request)
  const createItem = async () => {
    if (!input) {
      Alert.alert('Input Error', `Please enter a ${type} name before creating.`);
      return;
    }

    const url = `${URL}/api/admin/create`;
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ [type]: input }), // Dynamically use type and input
    };

    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (result.status) {
        Alert.alert('Item Created', `${type} created successfully!`);
        console.log('Item created:', result); // Debugging: Log the result of item creation
        fetchData(); // Refresh data after creation
      } else {
        console.log(result.message);
        Alert.alert('Creation Failed', result.message);
      }
    } catch (error) {
      console.error('Error creating item:', error);
      Alert.alert('Error', 'Failed to create item. Please try again later.');
    }
  };

  // Delete an item (DELETE request)
  const deleteItem = async (itemName) => {
    Alert.alert(
      'Confirm Deletion',
      `Are you sure you want to delete ${itemName}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            const url = `${URL}/api/admin/delete`;
            const options = {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ [type]: itemName }),
            };

            try {
              const response = await fetch(url, options);
              const result = await response.json();

              if (result.status) {
                Alert.alert('Item Deleted', `${itemName} has been deleted.`);
                console.log('Item deleted:', result);
                fetchData(); // Refresh data after deletion
              } else {
                Alert.alert('Deletion Failed', result.message);
              }
            } catch (error) {
              console.error('Error deleting item:', error);
              Alert.alert('Error', 'Failed to delete item. Please try again later.');
            }
          },
        },
      ]
    );
  };

  // Fetch data when component mounts and type changes
  useEffect(() => {
    fetchData();
  }, [type]);

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed header */}
      <Animatable.View animation="fadeIn" style={styles.headerContainer}>
        <Text style={styles.heading}>Manage Machines</Text>
        <Text style={[styles.heading, { fontSize: 15 }]}> Create , edit , delete</Text>
      </Animatable.View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Buttons to select type */}
        <View style={styles.inputContainer}>
          <TouchableOpacity
            style={[styles.typeButton, type === 'machine' && styles.activeButton]}
            onPress={() => setType('machine')}>
            <Text style={styles.buttonText}>Machine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'material' && styles.activeButton]}
            onPress={() => setType('material')}>
            <Text style={styles.buttonText}>Material</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.typeButton, type === 'mold' && styles.activeButton]}
            onPress={() => setType('mold')}>
            <Text style={styles.buttonText}>Mold</Text>
          </TouchableOpacity>
        </View>

        {/* Input for creating a new item */}
        <TextInput
          style={styles.input}
          placeholder={`Enter ${type} name`}
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.createButton} onPress={createItem}>
          <Text style={styles.buttonText}>Create {type}</Text>
        </TouchableOpacity>

        {/* List of items with delete option */}
        {data.length > 0 ? (
          <View style={styles.listContainer}>
            {data.map((item, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <TouchableOpacity
                  style={[styles.deleteButton]}
                  onPress={() => deleteItem(item.name)}>
                  <AntDesign name="delete" size={20} color="white" />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        ) : (
          <Text>No {type}s found</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background, // Soft blue background
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 30,
    backgroundColor: colors.primary,
    paddingVertical: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 8,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    zIndex: 1,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: colors.textWhite,
    fontFamily: 'Roboto', // Adding font family
  },
  scrollContainer: {
    flexGrow: 1,
    marginTop: 120, // Add margin-top to make space for the fixed header
    padding: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  typeButton: {
    backgroundColor: colors.secondary, // Different color for type buttons
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  activeButton: {
    backgroundColor: colors.primary, // Active state button color
  },
  input: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    marginBottom: 20,
    backgroundColor: colors.inputBackground,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  createButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  listContainer: {
    width: '100%',
    height: '100%',
    marginBottom: 100,
    marginTop: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: colors.cardBackground,
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    shadowColor: colors.shadowColor,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
    justifyContent: 'space-between',
  },
  cardTitle: {
    width: "auto",
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  button: {
    width: '30%',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: colors.buttonText,
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    padding: 10,
    width: 40,
    borderRadius: 10,
  },

});

export default HomePage;

