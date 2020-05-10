import React from 'react'
import {View, Text,StyleSheet} from 'react-native'
import {useSelector} from 'react-redux'
import { CATEGORIES } from '../data/dummy-data';
import MealItem from '../Components/MealItem';
import MealList from '../Components/MealList';


const CategoryMeals = props => {


	const catid = props.navigation.getParam('categoryID')
	const selMeal = useSelector(state => state.meals.filterMeals)
	const displayMeals = selMeal.filter(
		meal => meal.categoryIds.indexOf(catid)>=0
		);

	if (displayMeals.length ===0){
		return(
			<View style = {styles.screen}>
				<Text> No meals founds maybe check your filters</Text>
			</View>
			)
	}
	return (<MealList data = {displayMeals} navigation = {props.navigation}/>
		)
}
CategoryMeals.navigationOptions = navigationData => {
	const catid = navigationData.navigation.getParam('categoryID')
	const selectedCategory = CATEGORIES.find(x => x.id === catid)
	return {
		title: selectedCategory.title
	}
}

const styles = StyleSheet.create({
	screen:{
		flex :1,
		justifyContent:'center',
		alignItems:'center'
	}
})

export default CategoryMeals