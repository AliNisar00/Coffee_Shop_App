import React, { useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';

const getCategoriesFromData = (data: any) => {
  let temp: any = {}; // create empty object 'temp'; remember property in object is like index in array
  for (let i = 0; i < data.length; i++) { // passing through every object of data array
    if (temp[data[i].name] == undefined) { // if there is no data in temp object at property data[i].name 
      temp[data[i].name] = 1; // set value at that property = 1
    } else { // if there is corresponding data in object at that property, simply iterate to next property
      temp[data[i].name]++;
    }
  }
  // extract all properties from temp and make a 'categories' array, like extracting keys from a dictionary in Python
  let categories = Object.keys(temp);
  categories.unshift('All'); // add 'All' category at the start
  return categories;
};

const getCoffeeList = (category: string, data: any) => {
  // function to sort coffee list from data based on the selected category
  if (category == 'All') { // return entire coffee list for 'All' category
    return data;
  } else { // return sorted coffee list for any specific category other than 'All'
    let coffeelist = data.filter((item: any) => item.name == category);
    return coffeelist;
  }
};

const HomeScreen = () => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  //console.log('CoffeeLIST =', CoffeeList.length)
  
  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState(undefined);
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });
 const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));

  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}></ScrollView>
      {/* App Header */}
      <HeaderBar />
      <Text style={styles.ScreenTitle}>Find the best {'\n'}coffee for you</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1, // take entire available space on the screen even if there is no content within
  },
  ScreenTitle: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_30,
    position: 'absolute',
    top: 100,
    width: '100%',
  }
});

export default HomeScreen;
