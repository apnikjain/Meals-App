import React from 'react'
import {createAppContainer} from  'react-navigation';
import {createStackNavigator} from  'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer'
import CatagoriesScreen from '../Screens/CatagoriesScreen';
import CategoryMeals from '../Screens/CatagoryMeals';
import MealDetailScreen from '../Screens/MealDetailScreen';
import {Platform} from 'react-native'
import Colors from '../constants/Colors'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import FavoritiesScreen from '../Screens/FavoritiesScreen'
import {Ionicons} from '@expo/vector-icons'
import FiltersScreen from '../Screens/FiltersScreen'


const tabDesign = {
		headerStyle:{
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor: '',
	},
	headerTintColor: Platform.OS=== 'android' ? 'white': Colors.primaryColor
	}

const MealsNavigator =  createStackNavigator({
	Catagories: CatagoriesScreen,
	CategoryMeals:{
		screen:CategoryMeals
	},
	MealDetail : MealDetailScreen
},{
	defaultNavigationOptions:tabDesign
}
);


const favtab = createStackNavigator({
	fav: FavoritiesScreen,
	mealsDetial: MealDetailScreen
},{
	defaultNavigationOptions: tabDesign
}
)

const filtertab = createStackNavigator({
	filter: FiltersScreen
},{
	defaultNavigationOptions: tabDesign
}
)


const MealsTabNavigator = createBottomTabNavigator(
{
	Meals: {
		screen : MealsNavigator, 
		navigationOptions:{
			tabBarLabel: 'Meals',
			tabBarIcon: tabinfo =>{
				return (<Ionicons name = "ios-restaurant" color = {tabinfo.tintColor} size = {25}/>)
				}
	}},
	Fav: {screen: favtab, navigationOptions:{
		tabBarLabel: 'Favorities',
		tabBarIcon: (tabinfo) =>{
			return (<Ionicons name = 'ios-star' color = {tabinfo.tintColor} size = {25}/>)
		}
	}}
},
{
	tabBarOptions: {
		activeTintColor: Colors.accentColor,
	}
})


const mainNavigator = createDrawerNavigator({
	MealsFav: MealsTabNavigator,
	filter: filtertab
})




export default createAppContainer(mainNavigator) 