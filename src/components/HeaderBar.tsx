import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SPACING } from '../theme/theme';

interface HeaderBarProps { // Header bar properties
    title?: string,
}

const HeaderBar: React.FC<HeaderBarProps> = () => {
  return (
    <View>
      <Text>HeaderBar</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    HeaderContainer: {
        padding: SPACING.space_30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});

export default HeaderBar