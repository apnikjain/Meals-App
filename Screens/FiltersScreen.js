import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, Switch} from 'react-native'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../Components/HeaderButtons'
import {DrawerActions} from "react-navigation-drawer"
import {useDispatch} from 'react-redux'
import 	{setFilters} from '../store/action/meals'
 
const FilterSwitch = props =>{
	return(
			<View style = {styles.filterContainer}>
				<Text>{props.name}</Text>
				<Switch value = {props.value} onValueChange = {props.onChange}/>
			</View>

		)
			
}

const FiltersScreen = props => {

	const [isGlutenFree, setIsGlutenFree] = useState(false)
	const [isVegenFree, setIsVegenFree] = useState(false)
	const [isVegetarianFree, setIsVegetarianFree] = useState(false)
	const [isLacFree, setIsLacFree] = useState(false)


	const dispatch = useDispatch()

	const saveFilters = useCallback(() =>{
		const appliedFilter = {
			g:isGlutenFree,
			l:isLacFree,
			v:isVegetarianFree,
			vegan:isVegenFree
		}
		dispatch(setFilters(appliedFilter))	
	}, [isGlutenFree,isVegenFree,isLacFree,isVegetarianFree])

	useEffect(() =>{
		props.navigation.setParams({save: saveFilters})
	},[saveFilters])

	return (
		<View style = {styles.screen}>
			<Text style = {styles.title}>Avilable Filters	</Text>
			<FilterSwitch name = "Gluten Free" value = {isGlutenFree} onChange = {(x) => setIsGlutenFree(x)}/>
			<FilterSwitch name = "Vegen" value = {isVegenFree} onChange = {(x) => setIsVegenFree(x)}/>
			<FilterSwitch name = "Vegetarian" value = {isVegetarianFree} onChange = {(x) => setIsVegetarianFree(x)}/>
			<FilterSwitch name = "Lactose Free" value = {isLacFree} onChange = {(x) => setIsLacFree(x)}/>
		</View>
		)
}

FiltersScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Filter',
    headerLeft: () =>(
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
           navData.navigation.dispatch(DrawerActions.openDrawer());
                      }}
        />
      </HeaderButtons>
    ),
    headerRight: () =>(
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Save"
          iconName="ios-save"
          onPress={navData.navigation.getParam('save')}
        />
      </HeaderButtons>
    )
  };
};
const styles = StyleSheet.create({
	screen : {
		flex:1,
		alignItems:'center'
	},
	filterContainer:{
		flexDirection:"row",
		justifyContent:'space-between',
		alignItems: 'center',
		width:'80%',
		marginVertical:10
	},
	title:{
		fontSize: 22,
		margin:20,
		textAlign:'center'
	}
})

export default FiltersScreen