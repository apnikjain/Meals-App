import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';

const CategoryGridTile = props => {
	let Touch = TouchableOpacity;
	if(Platform.OS === 'android' && Platform.Version >= 21){
		Touch = TouchableNativeFeedback
	}
	return (
		<View style={styles.gridItem}>
			<Touch style={{ flex: 1 }} onPress = {props.onSelect}>
			    <View style={{ ...styles.container, ...{ backgroundColor: props.color } }}>
			      <Text style = {styles.title}>{props.title}</Text>
			    </View>
	    	</Touch>
	    </View>
    );
};

const styles = StyleSheet.create({
	gridItem: {
    flex: 1,
    margin: 15,
    height: 150
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 22,
    textAlign: 'right'
  }
});

export default CategoryGridTile
