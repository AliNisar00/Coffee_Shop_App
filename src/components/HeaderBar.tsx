import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FONTFAMILY, SPACING, FONTSIZE, COLORS } from '../theme/theme';
import GradientBGIcon from './GradientBGIcon';
import ProfilePic from './ProfilePic';

interface HeaderBarProps { // Header bar properties
  title?: string; // '?' denotes optional
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
      <GradientBGIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.HeaderText}>{title}</Text>
      <ProfilePic />
    </View>
  );
};

const styles = StyleSheet.create({
    HeaderContainer: {
        position: 'absolute',
        top: 0,
        width: '100%',
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
