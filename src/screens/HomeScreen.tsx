import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useStore } from '../store/store'

const getCategoriesFromData = (data: any) => {
  let temp: any = {}; // create empty object 'temp'; remember property in object is like index in array
  for (let i = 0; i < data.length; i++) { // passing through every object of data array
    if (temp[data[i].name] == undefined) { // if there is no data in temp object at property data[i].name 
      temp[data[i].name] = 1; // set value at that property = 1
    } else { // if there is corresponding data in object at that property, simply iterate to next property
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp); // extract all properties from temp and make an array
  categories.unshift('All'); // add 'All' category at the start
  return categories;
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
 const [sortedCoffee, setSortedCoffee] = useState(undefined);

  return (
    <View>
      <Text>HomeScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({})

export default HomeScreen
