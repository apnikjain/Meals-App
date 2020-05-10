import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import MealItem from '../Components/MealItem';
import {useSelector} from 'react-redux'

const MealList = props => {
	const favmeals = useSelector(state => state.meals.favmeals)

	const renderGridItem = itemData => {
		const isFav = favmeals.some(meal => meal.id === itemData.item.id)
		return (
			<MealItem 
			image = {itemData.item.imageUrl}
			title = {itemData.item.title}
			duration = {itemData.item.duration}	
			complexity = {itemData.item.complexity}
			affordability = {itemData.item.affordability}
			onSelectMeal = {() => {
				props.navigation.navigate({routeName :'MealDetail', params :{
					mealid: itemData.item.id,
					mealTitle: itemData.item.title,
					y: isFav
				}})
			} }
			/>
			)
	}
	return (
		<View style ={styles.screen}>
			<FlatList 
				data = {props.data} 
			    renderItem = {renderGridItem}
			/>
		</View>
		)
};

const styles = StyleSheet.create({
	screen:
	{
		flex:1,
		justifyContent:'center',
		alignItems:'center',
		padding: 15,
	}
})

export default MealList