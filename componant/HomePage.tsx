import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Lead from '@/app/(tabs)/Lead';
import Quality from '@/app/(tabs)/Quality';
import Operator from '@/app/(tabs)/Operator';


const RoleBasedContent = ({ role }) => {
  console.log(role);
  const renderContent = () => {
    switch (role) {
      case 'production_head':
        return <Lead />;
      case 'quality':
        return <Quality />;
      case 'operator':
        return <Operator />;
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
  },

});

export default RoleBasedContent;

