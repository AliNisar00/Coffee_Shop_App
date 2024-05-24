import React, { useState } from 'react'
import { ScrollView, StatusBar, StyleSheet, Text, Touchable, TouchableOpacity, View, TextInput } from 'react-native'
import { useStore } from '../store/store'
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import CustomIcon from '../components/CustomIcon';

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
  const [searchText, setSearchText] = useState('');
  const [categoryIndex, setCategoryIndex] = useState({
    index: 0,
    category: categories[0],
  });

  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));

  const tabBarHeight = useBottomTabBarHeight();
  
  // console.log('categories = ', categories);
  
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}></ScrollView>
      {/* App Header */}
      <HeaderBar />

      {/* Screen Title */}
      <Text style={styles.ScreenTitle}>Find the best {'\n'}coffee for you</Text>
    
      {/* Search Input */}
      <View style={styles.InputContainerComponent}>
        <TouchableOpacity onPress={() => {}}>
          <CustomIcon
            name='search'
            size={FONTSIZE.size_18}
            color={searchText.length > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}
            style={styles.SearchInputButton} 
          />
        </TouchableOpacity>
        <TextInput
          placeholder={'Find your Coffee...'}
          value={searchText}
          onChangeText={text => setSearchText(text)}
          placeholderTextColor={COLORS.primaryLightGreyHex}
          style={styles.TextInputContainer}
        />
      </View>

      {/* Category Scroller */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.CategoryScrollViewStyle}>
        {categories.map((data, index) => (
          <View 
            key={index.toString()} 
            style={styles.CategoryScrollViewContainer}>
            <TouchableOpacity
              style={styles.CategoryScrollViewItem}
              onPress={() => {
                setCategoryIndex({index: index, category: categories[index]});
                setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)])
                }}>
              <Text
                style={[styles.CategoryTextActive,
                categoryIndex.index == index ? {color: COLORS.primaryOrangeHex} : {},
                ]}>
                  {data}
              </Text>
              {categoryIndex.index == index ? <View style={styles.ActiveCategory} /> : <></>}
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

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
  },
  InputContainerComponent: {
    position: 'absolute',
    top: 200, // Adjust this value as needed to position the input container higher or lower
    left: SPACING.space_20,
    right: SPACING.space_20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGreyHex,
    borderRadius: SPACING.space_12,
    padding: SPACING.space_10,
    shadowColor: COLORS.primaryBlackHex,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  SearchInputButton: {
    marginRight: SPACING.space_10,
  },
  TextInputContainer: {
    flex: 1,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  CategoryScrollViewStyle: {
    paddingHorizontal: SPACING.space_20,
    marginBottom: SPACING.space_20,
  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryOrangeHex,
  },
  CategoryTextActive: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightGreyHex,
    marginBottom: SPACING.space_4,
  },
});

export default HomeScreen;
