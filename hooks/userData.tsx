import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Custom hook to fetch user data from AsyncStorage
const useUserData = () => {
  const [userData, setUserData] = useState({
    name: '',
    role: '',
    id: '',
    token: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const name = await AsyncStorage.getItem('name');
        const role = await AsyncStorage.getItem('role');
        const id = await AsyncStorage.getItem('id');
        const token = await AsyncStorage.getItem('token');

        setUserData({
          name: name || 'No name found',
          role: role || 'No role found',
          id: id || 'No ID found',
          token: token || 'No token found',
        });
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { userData, loading };
};

export default useUserData;

