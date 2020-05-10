import React from 'react';
import {View,Text,StyleSheet} from 'react-native'
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import {DrawerActions} from 'react-navigation-drawer'
import CustomHeaderButton from '../Components/HeaderButtons'
import MealList from '../Components/MealList';
import {useSelector} from 'react-redux'
import {Button } from 'react-native'


const FavoritesScreen = props => {



  const favMeals = useSelector(state => state.meals.favmeals)

  if(favMeals.length === 0 || !favMeals){
    return(
      <View style = {styles.screen}>
        <Text>No Favorite meals found. Start adding some!</Text>
      </View>
      )
  }

  return <MealList data={favMeals} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = navData => {
  return {
    headerTitle: 'Your Favorites',
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
    )
  };
};

const styles = StyleSheet.create({
  screen:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  }
})

export default FavoritesScreen;
