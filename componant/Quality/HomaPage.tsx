import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const RoleBasedContent = ({ role }) => {
  const renderContent = () => {
    switch (role) {
      case 'production_head':
        return <Text style={styles.text}>Welcome, Production Head!</Text>;
      case 'quality':
        return <Text style={styles.text}>Welcome, Quality Checker!</Text>;
      case 'operator':
        return <Text style={styles.text}>Welcome, Operator!</Text>;
      default:
        return <Text style={styles.text}>Role not recognized.</Text>;
    }
  };

  return (
    <View style={styles.container}>
      {renderContent()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default RoleBasedContent;

