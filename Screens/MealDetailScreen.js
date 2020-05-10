import React, {useEffect, useCallback} from 'react'
import {View,ScrollView, Image, Text, StyleSheet, Button} from 'react-native'
import { CATEGORIES } from '../data/dummy-data';
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../Components/HeaderButtons'
import {useSelector, useDispatch} from 'react-redux'
import {toggleFav} from '../store/action/meals'

const Listitem = props =>{
	return(
		<View style = {styles.a}>
			<Text style = {styles.b}>{props.children}</Text>
		</View>
		)
}

const MealDetialScreen = props => {
	const avaMeal = useSelector(state => state.meals.meals)
	const mealID = props.navigation.getParam('mealid')
	const currentFav = useSelector(state => state.meals.favmeals.some(meals => meals.id === mealID))
	const selectedMeal = avaMeal.find(x => x.id === mealID )

	const dispatch = useDispatch()

	const toggleFavHandler = useCallback(() =>{
		dispatch(toggleFav(mealID))
	},[dispatch,mealID])

	useEffect(() =>{
		props.navigation.setParams({x: toggleFavHandler})
	},[toggleFavHandler])
	
	useEffect(() =>{
		props.navigation.setParams({y: currentFav})
	}, [currentFav])

	return (
		<ScrollView>
			<Image source = {{uri: selectedMeal.imageUrl}} style = {styles.image}/>
			<View style={{ ...styles.mealRow, ...styles.mealDetail }}>
	            <Text>{selectedMeal.duration}m</Text>
	            <Text>{selectedMeal.complexity.toUpperCase()}</Text>
	            <Text>{selectedMeal.affordability.toUpperCase()}</Text>
          	</View>
          	<Text style = {styles.title}>Ingredients</Text>
          	{selectedMeal.ingredients.map(x => <Listitem key = {x}>{x}</Listitem>)}
          	<Text style = {styles.title}>Steps</Text>
          	          	{selectedMeal.steps.map(x => <Listitem key = {x}>{x}</Listitem>)}
	  
		</ScrollView>
		)
}
MealDetialScreen.navigationOptions = nvigationData => {

	
	const mealTitle = nvigationData.navigation.getParam('mealTitle')
	const toggleFavFunction = nvigationData.navigation.getParam('x')
	const favOrNot = nvigationData.navigation.getParam('y')
	// const selectedMeal = MEALS.find(x => x.id === mealID )
	return{
		title:mealTitle,
		headerRight:() => 
			<HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
				<Item title = 'fav' iconName = {favOrNot? 'ios-star': 'ios-star-outline'} onPress = {toggleFavFunction}/>
			</HeaderButtons>
		}
}
const styles = StyleSheet.create({
	screen : {
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
	mealRow: {
    flexDirection: 'row'
  },
  a:{
  	marginVertical: 10,
  	marginHorizontal:20,
  	borderColor:'#ccc',
  	borderWidth:3,
  	padding:10
  },
mealDetail: {
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '5%'
  },
  image :{
  	width:'100%',
  	height:200
  },
  title:{
  	fontSize: 22,
  	textAlign:'center' 
  }
})

export default MealDetialScreen