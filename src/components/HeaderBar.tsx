import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY, SPACING, FONTSIZE, COLORS } from '../theme/theme';

interface HeaderBarProps { // Header bar properties
  title?: string, // '?' denotes optional
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View>
      <Text style={styles.HeaderText}>{title}</Text>
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
    HeaderText: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_20,
      color: COLORS.primaryWhiteHex,
    },
});

export default HeaderBar;
