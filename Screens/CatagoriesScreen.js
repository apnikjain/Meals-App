import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import { CATEGORIES } from '../data/dummy-data';
import Colors from '../constants/Colors'
import CategoryGridTile from '../Components/CategoryGridtile'
import CustomHeaderButton from '../Components/HeaderButtons'
import {DrawerActions} from "react-navigation-drawer"
const CatagoriesScreen = props => {

const renderGridItem = itemData => {
  return (
  	<CategoryGridTile 	
  	categoryid = {itemData.item.id}
  	title = {itemData.item.title}
  	onSelect = {() => {
  		props.navigation.navigate({routeName: 'CategoryMeals', params:{
  			categoryID: itemData.item.id
  		}})
  	}}
  	color = {itemData.item.color}
  	/>
  );
};
  
  return (
    <FlatList
      keyExtractor={(item, index) => item.id}
      data={CATEGORIES}
      renderItem={renderGridItem}
      numColumns={2}
    />
  );
};

CatagoriesScreen.navigationOptions = (navData) => {
  return{
    title: 'Meals Category',
    headerLeft: () =>
    <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
      <Item title = 'Menu' iconName = 'ios-menu' onPress = {() =>{navData.navigation.dispatch(DrawerActions.toggleDrawer());}}/>
    </HeaderButtons>
  }
	
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
});

export default CatagoriesScreen;
